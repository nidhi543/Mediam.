import React, { useState, useEffect, createRef } from "react";
import {
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";

import styles from "./style.module.css";

const NewsCard = ({ article, i, activeArticle }) => {
  let { description, publishedAt, source, title, url, urlToImage } = article;

  //implementing the scroll
  const [elRefs, setElRefs] = useState([]);
  const scrollToRef = (ref) => window.scroll(0, ref.current.offsetTop - 50);

  useEffect(() => {
    window.scroll(0, 0);

    setElRefs((refs) =>
      Array(20)
        .fill()
        .map((_, j) => refs[j] || createRef())
    );
  }, []);

  useEffect(() => {
    if (i === activeArticle && elRefs[activeArticle]) {
      scrollToRef(elRefs[activeArticle]);
    }
  }, [i, activeArticle, elRefs]);

  return (
    <div>
      <Card
        ref={elRefs[i]}
        className={activeArticle === i ? styles.activeCard : styles.card}
      >
        <CardActionArea href={url} target="_blank">
          <CardMedia
            className={styles.media}
            image={
              urlToImage ||
              "https://media.istockphoto.com/id/1182477852/photo/breaking-news-world-news-with-map-backgorund.jpg?s=612x612&w=0&k=20&c=SQfmzF39HZJ_AqFGosVGKT9iGOdtS7ddhfj0EUl0Tkc="
            }
            title={title}
          />
          <div className={styles.details}>
            <Typography variant="body2" color="textSecondary" component="h2">
              {new Date(publishedAt).toDateString()}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="h2">
              {source.name}
            </Typography>
          </div>

          <Typography
            className={styles.title}
            gutterBottom
            variant="h5"
            component="h2"
          >
            {title}
          </Typography>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={styles.cardActions}>
          <Button
            className={styles.button}
            size="small"
            color="primary"
            href={url}
            target="_blank"
          >
            Learn More
          </Button>
          <Typography variant="h5" color="textSecondary" component="h2">
            {i + 1}
          </Typography>
        </CardActions>
      </Card>
    </div>
  );
};

export default NewsCard;
