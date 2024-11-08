import { useState } from 'react';
import sql from 'mssql';
import Config from 'react-native-config';

// Configuration interface for database connection
interface DatabaseConfig {
  user: string;
  password: string;
  server: string;
  database: string;
  options: {
    encrypt: boolean;
    trustServerCertificate: boolean;
  };
}

// Query hook return type
interface QueryResult<T> {
  data: T[] | null;
  error: Error | null;
  loading: boolean;
}

/**
 * Custom hook for executing MSSQL queries with internally managed configuration
 * @returns An object with query execution function and state
 */
export const useMSSQLQuery = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<any[] | null>(null);

  // Private method to get database configuration from environment
  const getDatabaseConfig = (): DatabaseConfig => {
    const config: DatabaseConfig = {
      user: Config.DB_USER || '',
      password: Config.DB_PASSWORD || '',
      server: Config.DB_SERVER || '',
      database: Config.DB_DATABASE || '',
      options: {
        encrypt: Config.DB_ENCRYPT === 'true',
        trustServerCertificate: Config.DB_TRUST_SERVER_CERTIFICATE === 'true'
      }
    };

    // Validate configuration
    if (!config.user || !config.password || !config.server || !config.database) {
      throw new Error('Incomplete database configuration. Check your .env file.');
    }

    return config;
  };

  /**
   * Execute a SQL query
   * @param queryString SQL query to execute
   * @returns Promise resolving to query results
   */
  const executeQuery = async <T = any>(queryString: string): Promise<QueryResult<T>> => {
    setLoading(true);
    setError(null);

    let pool: sql.ConnectionPool | null = null;

    try {
      // Retrieve configuration from environment
      const config = getDatabaseConfig();

      // Create a new connection pool
      pool = new sql.ConnectionPool(config);
      
      // Connect to database
      await pool.connect();

      // Execute query
      const result = await pool.request().query(queryString);

      // Store and return results
      const queryResults = result.recordset;
      setData(queryResults);

      return {
        data: queryResults,
        error: null,
        loading: false
      };
    } catch (err) {
      // Handle and store any errors
      const processedError = err instanceof Error ? err : new Error(String(err));
      setError(processedError);

      return {
        data: null,
        error: processedError,
        loading: false
      };
    } finally {
      // Close the pool if it exists
      if (pool) {
        await pool.close();
      }
      setLoading(false);
    }
  };

  return { executeQuery, data, error, loading };
};