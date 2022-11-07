import React from 'react'
import NewsCard from '../NewsCard/NewsCard'
import {Grow, Grid, Typography} from '@mui/material'
import styles from './styles.module.css'


const infoCards = [
  { color: '#3b82f6', title: 'News by Sources', info: 'CNN, Wired, BBC News, Time, IGN, Buzzfeed, ABC News...', text: 'Give me the news from CNN' },
  { color: '#3b82f6', title: 'News by Categories', info: 'Business, Entertainment, General, Health, Science, Sports, Technology', text: 'Give me the latest Technology news' },
  { color: '#3b82f6', title: 'News by Terms', info: 'Bitcoin, PlayStation 5, Smartphones, Donald Trump...', text: 'What\'s up with PlayStation 5' },
  { color: '#3b82f6', title: 'Latest News', text: 'Give me the latest news'}
];

const NewsCards = ({articles, activeArticle}) => {
  if(!articles.length){
    return(
    <Grow in>
    <Grid className = {styles.container} container spacing = {3} alignItems ="stretch">
    {infoCards.map((infoCard,ind) => (
      <Grid key={ind} className = {styles.infoCard} item  xs={12}  sm = {6} md = {4} lg = {3} style={{display: 'flex'}}  >
          <div className = {styles.card} style={{ backgroundColor: infoCard.color}}>
                <Typography variant="h5" component="h5">{infoCard.title}</Typography>
                {infoCard.info ? <Typography variant="h6" component="h6"><strong>{infoCard.title.split(' ')[2]}</strong>: <br />{infoCard.info}</Typography> : null}
                <Typography variant="h6" component="h6"><strong> Try saying:</strong> <br /> <i>{infoCard.text}</i></Typography>
            </div>
      </Grid>
    ))}
    </Grid>
   </Grow>
    )
  }
  return (
    <div>
       <Grow in>
        <Grid container spacing = {3} alignItems ="stretch">
        {articles.map((article,i) => (
          <Grid item  key ={i} xs={12}  sm = {6} md = {4} lg = {3} style={{display: 'flex'}}  >
            <NewsCard article = {article} i = {i} activeArticle ={activeArticle}/>
          </Grid>
        ))}
        </Grid>
       </Grow>
    </div>
  )
}

export default NewsCards