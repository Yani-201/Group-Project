# Group-Project
Selected Title: Movie Review

Section: 3 

Group Members

1. Yanet Mekuria (UGR/7313/13)
2. Yohannes Dessie (UGR/7612/13)
3. Amanuel Beyene (UGR/1157/13)
4. Gelila Moges (UGR/5888/13)
5. Feven Tesfaye (UGR/7905/13)


## Concept
The website moviereview lets any user post a movie where other users can post reviews on. The movie pannel has a coverPage, a trailer, and a description. And the reviews have rating(1-10) and review. The two features with _CRUD_ that we decided to implement are the **Movie** and **Review**. 


***BEFORE TESTING OUR IMPLEMENTATION, Its important that you set up a mysql database for the backend to operate on and put your mysql user(usually root) and mysql password in the .env file like this: ***
```
DATABASE_USER = "root"
DATABASE_PASSWORD = "PASSWORD"
```


This features can be tested as follows:

```
Movie Create: By using the Add movie button on movies.html
Movie Update: By using the Edit movie button on the specifc movie webpage(users can only update movies they created)
Movie Delete: By using the Delete movie button on the specifc movie webpage(users can only delete movies they created)
Movie Read: list of movies are displayed on movies.html


Review Create: "Add your own review" on any movie's page.
Review Update: "Edit" button on any of users own comments(PS Edit button won't show unless user made the comment).
Review Delete: "Delete" button on any of users own comments(PS Delete button won't show unless user made the comment).
Review Read: list of reviews relevant to a movie are shown on any of movie's pages.
```

##Database Choice

We choose to use relational database because it offers us with:
1. Data integrity (check constraints, referential integrity constraints etc)
2. Security and compliance
and While Document Databases offer a lot of scalability and flexibility we valued the consistency of the relational databases as our tables have a rigid structure.
