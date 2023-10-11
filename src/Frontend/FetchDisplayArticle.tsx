import React, {useState, useEffect} from 'react'; 

interface Article {
    title: string;
    summary: string;
    date: string;
    publisher: string;
  }

const FetchDisplayArticle: React.FC = () => {
    const [articles, setArticles] = useState<Article[]>([]); 

    // Fetch articles from database when the component mounts 
    useEffect(() => {
        fetchArticles(); 
    }, []); 

    const fetchArticles = async () => {
        try {
            // Replace your-api-endpoint with your actual backend api endpoint
            const response = await fetch('your-api-endpoint/articles')
            const data = await response.json();
            setArticles(data);
        } catch (error){
            console.error('Error fetching data: ', error); 
        }
    }; 

    return (
        <div>
          <h1>News Articles</h1>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Summary</th>
                <th>Date</th>
                <th>Publisher</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article, index) => (
                <tr key={index}>
                  <td>{article.title}</td>
                  <td>{article.summary}</td>
                  <td>{article.date}</td>
                  <td>{article.publisher}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
};

export default FetchDisplayArticle;
    