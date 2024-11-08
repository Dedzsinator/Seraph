SELECT 
    ap.Title AS ArtPieceTitle,
    ap.Description AS ArtPieceDescription,
    ap.Category AS ArtPieceCategory,
    s.SalesPrice AS Price,
    ap.ImageURL,
    u.Username AS ArtistName
FROM 
    ArtPieces AS ap
JOIN 
    Users AS u ON ap.ArtistID = u.UserID
LEFT JOIN 
    Sales AS s ON ap.ArtID = s.ArtID

SELECT 
    ap.Title AS ArtPieceTitle,
    a.Description AS AuctionDescription,
    a.Category AS AuctionCategory,
    a.StartDate,
    a.EndDate,
    a.ReservePrice
FROM 
    Auctions AS a
JOIN 
    ArtPieces AS ap ON a.ArtID = ap.ArtID
WHERE 
    a.IsActive = 1

SELECT 
    a.AuctionID,
    ap.Title AS ArtPieceTitle,
    MAX(b.BidAmount) AS CurrentWinningBid,
    u.Username AS WinningUser
FROM 
    Auctions AS a
JOIN 
    Bids AS b ON a.AuctionID = b.AuctionID
JOIN 
    Users AS u ON b.UserID = u.UserID
JOIN 
    ArtPieces AS ap ON a.ArtID = ap.ArtID
WHERE 
    a.IsActive = 1
GROUP BY 
    a.AuctionID, ap.Title, u.Username
HAVING 
    MAX(b.BidAmount) IS NOT NULL
