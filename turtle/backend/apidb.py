import sqlite3

def createTasks():
    conn = sqlite3.connect('./database.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS tasks
                 (id integer primary key, author text not null, title text not null, description text not null, price real not null, status text not null,
                 check (status in ('Posted', 'Accepted', 'Completed')))''')
    
    c.execute('''CREATE TABLE IF NOT EXISTS accepted
                 (task_id integer primary key, acceptor text not null, FOREIGN KEY (task_id) REFERENCES tasks(id))''')
    
    c.execute('''CREATE TABLE IF NOT EXISTS completed
                (task_id integer primary key, FOREIGN KEY (task_id) REFERENCES tasks(id))''')
    conn.commit()
    conn.close()
    
def getAllTasks():
    conn = sqlite3.connect('./database.db')
    c = conn.cursor()
    c.execute('''SELECT * FROM tasks''')
    tasks = c.fetchall()
    print(tasks)
    conn.commit()
    conn.close()

def addTask(author, title, description, price):
    conn = sqlite3.connect('./database.db')
    c = conn.cursor()
    c.execute('''INSERT INTO tasks (author, title, description, price, status) VALUES (?, ?, ?, ?, ?)''', (author, title, description, price, 'Posted'))
    conn.commit()
    conn.close()
    
    
def acceptTask(accpetor, task_id):
    conn = sqlite3.connect('./database.db')
    c = conn.cursor()
    c.execute('''INSERT INTO accepted (acceptor, task_id) VALUES (?, ?)''', (accpetor, task_id))
    c.execute('''UPDATE tasks SET status = 'Accepted' WHERE id = ?''', (task_id,))
    conn.commit()
    conn.close()

def completeTask(task_id):
    conn = sqlite3.connect('./database.db')
    c = conn.cursor()
    c.execute('''INSERT INTO completed (task_id) VALUES (?)''', (task_id,))
    c.execute('''UPDATE tasks SET status = 'Completed' WHERE id = ?''', (task_id,))
    c.execute('''DELETE FROM accepted WHERE task_id = ?''', (task_id,))
    conn.commit()
    conn.close()

createTasks()
acceptTask('Emma', 1)
acceptTask('Marie', 3)
completeTask(1)

