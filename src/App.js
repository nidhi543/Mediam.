import React, {useState ,useEffect} from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import wordsToNumbers from 'words-to-numbers';
import NewsCards from './components/NewsCards/NewsCards';
import styles from './app.module.css';

const alanKey = '85fd1e82d9313662d63888593abd816d2e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () => {
 const [newsArticles, setNewsArticles] = useState([]);
 const [activeArticle, setActiveArticle] = useState(-1);

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({command, articles, number}) => {
         if(command === 'newHeadlines'){  
          // console.log(articles);
         setNewsArticles(articles);
         setActiveArticle(-1);
         }
        else if (command === 'highlight') { 
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === 'open') { 
          const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
          const article = articles[parsedNumber - 1];
        
          if (parsedNumber > articles.length) {
            alanBtn().playText('Please try that again...');
          } else if (article) {
            window.open(article.url, '_blank');
            alanBtn().playText('Opening...');
          } else {
            alanBtn().playText('Please try that again...');
          }
        }
      },
    })
  },[])

  return (
    <div className= {styles.app}>
      <nav className = {styles.nav}> <span>Mediam.</span> <div>- The voice search news app </div> </nav>
      {!newsArticles.length? <img className=  {styles.hero} alt="voice-search" />: null}
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
      <div className ={styles.footer}>Made with 💙</div>
    </div>
  );
}

export default App;
