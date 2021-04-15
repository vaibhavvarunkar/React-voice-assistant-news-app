import React, { useState, useEffect } from 'react';
import alanBtn from "@alan-ai/alan-sdk-web";
import wordsToNumbers from "words-to-numbers";
import NewsCards from './components/NewsCards/NewsCards';
import useStyles from "./styles.js";
import Logo from "./img/a01622630e9648688c1c578bb6a9ee9e.png";


const alanKey = "2c39035e2c54c425e5c7dbfc18c92f6d2e956eca572e1d8b807a3e2338fdd0dc/stage";

const App = () => {

  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);
  const classes = useStyles();

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if (command === 'newHeadlines') {
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === 'highlight') {
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
  }, []);
  return (
    <>
      <div>
        <div className={classes.logoContainer}>
          <img src={Logo} className={classes.alanLogo} alt="alan logo" />
        </div>
        <NewsCards articles={newsArticles} activeArticle={activeArticle} />
      </div>
      <div className={classes.footerContainer}>
        <h4 className={classes.footerPara}>Powered By Alan AI</h4>
      </div>
    </>
  )

}

export default App;
