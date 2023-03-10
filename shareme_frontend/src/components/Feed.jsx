import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { searchQuery, feedQuery } from "../utils/data";
import { client } from "../client";
import MasoryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

const Feed = () => {
  const [ pins, setPins ] = useState();
  const [loading, setLoading] = useState(true);
  const { categoryId } = useParams();

  useEffect(() => {
    if (categoryId) {
      setLoading(true);
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      setLoading(true);

      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [categoryId]);

  if (loading)
    return <Spinner message="We are adding new ideas to your feed!" />;
  return <div>
    {
      pins && <MasoryLayout pins={pins}/>
    }
  </div>;
};

export default Feed;
