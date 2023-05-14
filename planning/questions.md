Q. How do we manage user data on the tables? Polling vs Websockets vs Database
Andy says - polling is near real time, used with set interval. 

Q. Can/should we use cookies to track whether someone is in a queue already? is there a simpler way?
Andy says - Unique constraint might be better. User PK id can only be insterted onto tables once.
eg. add_index :people, [:firstname, :lastname, :dob], unique: true
Could use a created at timestamp for users db. 
SELECT * FROM users WHERE table_id = 1 ORDER BY enqueued_at

Q. How do we use pull requests effectively so that we are on the same page as out other team members 
Nally says follow the pull request flow

Q. how do we tie the person using the phone to the user in the database? magic? 
A. cookie

Q. do we need to add a table for admins? can we just add a column in users for is_admin?
are custom routes an option? or maybe setState? what is the simplest solution?
A. Add a column in users table for is_admin boolean

Q. Why does git 