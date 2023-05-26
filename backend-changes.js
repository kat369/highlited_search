app.get("/search", async (req, res) => {
  try {
    const { key, limit } = req.query;
    
    if(key !== ""){
      const data = await articles.find({
          $or: [
            { name: { $regex: key, $options: "i" } },
            { author: { $regex: key, $options: "i" } },
            { keywords: { $regex: key, $options: "i" } },
            { abstract: { $regex: key, $options: "i" } },
            { referance: { $regex: key, $options: "i" } },
          ],
        }).limit(limit);
    res.json({ data });
    }else{
      res.json({ message : "Enter a key word to search"});
    }
    
  } catch (error) {
    console.log(error);
  }
});
