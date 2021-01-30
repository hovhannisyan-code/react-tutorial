function Article() {
    const ArticleTitle = 'News title';
    const Articlebody = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.';
    return (
        <div className="article">
            <h1 className="title">{ArticleTitle}</h1>
            <p className="body">{Articlebody}</p>
        </div>
    )
}
export default Article;