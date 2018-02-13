# newhome
Treehouse Front End Web Development Project 12

-   #### Mobile first design.

````
// ==========================================================================
// Media Queries
// ==========================================================================
@mixin mq($break) {
  $value: map-get($breaks, $break);
  $med: map-get($breaks, 'med');
  @if $value==null {
    @error "`#{$break}` is not a valid breakpoint name";
  } @else if $value < $med {
    @media (max-width: $value) {
      @content;
    }
  } @else {
    @media (min-width: $value) {
      @content;
    }
  }
}
````

-   #### Images that link to at least 4 other projects.

````
// GET / All Projects
api.get('/api/projects', function(req, res, next) {
    Project.find({}, function(err, docs) {
        if (!err) {
            var results = {
                'posts': {}
            };
            results.posts = docs;
            res.send(results);
        } else {
            res.send(err);
        }
    });
});
````

-   #### A short description of each project and the skills you used to build it.
````
<article className={this.state.classNames[index]}>
    <ProjectArticle
      post={post.body}
      images={post.images}
      skills={post.tags}
      title={post.title}
      date={post.date}
      update={post.lastUpdated}
      git={post.gitHub}
      url={post.projectUrl}
    />
</article>
````

-   #### Contact information
````
<div className="footer__contact" id="contact">
  <h1 className="footer__title">Contact</h1>
  <a href="https://www.linkedin.com/in/ezell-frazier-830a50135"><Icon name="linkedin" className="footer__social" /></a>
  <a href="https://github.com/lynellf"><Icon name="github" className="footer__social" /></a>
  <a href="https://twitter.com/_Ezell_"><Icon name="twitter" className="footer__social" /></a>
  <a href="mailto:lynellf@gmail.com"><svg
    className="footer__social"
    aria-labelledby="simpleicons-gmail-icon"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M24 4.5v15c0 .85-.65 1.5-1.5 1.5H21V7.387l-9 6.463-9-6.463V21H1.5C.649 21 0 20.35 0 19.5v-15c0-.425.162-.8.431-1.068A1.485 1.485 0 0 1 1.5 3H2l10 7.25L22 3h.5c.425 0 .8.162 1.069.432.27.268.431.643.431 1.068z" />
  </svg></a>
</div>
````
-   #### Publish your portfolio on GitHub pages, or with a web hosting company, so that the code reviewers can see your finished work.

[View Live Project Here](https://ezellfrazier.com)
