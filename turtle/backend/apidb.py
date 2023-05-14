import sqlite3


def createTasks():
    conn = sqlite3.connect('./database.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS tasks
                 (id integer primary key, author text not null, title text not null, description text not null, price real not null , note_author, note_acceptor, status text not null,
                 check (status in ('Posted', 'Accepted', 'Completed')))''')

    c.execute('''CREATE TABLE IF NOT EXISTS accepted
                 (task_id integer primary key, acceptor text not null, FOREIGN KEY (task_id) REFERENCES tasks(id))''')

    c.execute('''CREATE TABLE IF NOT EXISTS completed
                (task_id integer primary key, author text not null, acceptor text not null, FOREIGN KEY (task_id) REFERENCES tasks(id), FOREIGN KEY (author) REFERENCES users(username))
                ''')
    conn.commit()
    conn.close()


def createUsers():
    conn = sqlite3.connect('./database.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS users
                (id_user integer not null primary key autoincrement, username text not null, password text not null, email text not null)''')
    conn.commit()
    conn.close()


def getAllTasks():
    conn = sqlite3.connect('./database.db')
    c = conn.cursor()
    c.execute('''SELECT * FROM tasks''')
    tasks = c.fetchall()
    datatosend = []
    for task in tasks:
        datatosend.append({'id': task[0], 'author': task[1], 'title': task[2],
                          'description': task[3], 'price': task[4], 'note_author':task[5], 'note_acceptor':task[6], 'status': task[7]})
    conn.commit()
    conn.close()
    return datatosend


def addTask(author, title, description, price):
    conn = sqlite3.connect('./database.db')
    c = conn.cursor()
    c.execute('''INSERT INTO tasks (author, title, description, price, note_author, note_acceptor,status) VALUES (?, ?, ?, ?, ?, ?, ?)''',
              (author, title, description, price,-1,-1, 'Posted'))
    conn.commit()
    conn.close()


def acceptTask(accpetor, task_id):
    conn = sqlite3.connect('./database.db')
    c = conn.cursor()
    c.execute('''INSERT INTO accepted (acceptor, task_id) VALUES (?, ?)''',
              (accpetor, task_id))
    c.execute('''UPDATE tasks SET status = 'Accepted' WHERE id = ?''', (task_id,))
    conn.commit()
    conn.close()

def getAcceptor(task_id):
    conn = sqlite3.connect('./database.db')
    c = conn.cursor()
    c.execute('''SELECT acceptor FROM accepted WHERE task_id = ?''', (task_id,))
    acceptor = c.fetchone()[0]
    conn.commit()
    conn.close()
    return acceptor
    

def completeTask(author,task_id):
    conn = sqlite3.connect('./database.db')
    c = conn.cursor()
    c.execute('''INSERT INTO completed (author, task_id, acceptor) VALUES (?, ?, ?)''',
                (author, task_id, getAcceptor(task_id)))
    c.execute('''UPDATE tasks SET status = 'Completed' WHERE id = ?''', (task_id,))
    conn.commit()
    conn.close()

def noteTaskPosted(task_id, note):
    print(task_id, note)
    conn = sqlite3.connect('./database.db')
    c = conn.cursor()
    c.execute('''UPDATE tasks SET note_author = ? WHERE id = ?''', (note, task_id,))
    conn.commit()
    conn.close()
    
def noteTaskAccepted(task_id, note):
    conn = sqlite3.connect('./database.db')
    c = conn.cursor()
    c.execute('''UPDATE tasks SET note_acceptor = ? WHERE id = ?''', (note, task_id,))
    conn.commit()
    conn.close()
    
def getTask(task_id):
    conn = sqlite3.connect('./database.db')
    c = conn.cursor()
    c.execute('''SELECT * FROM tasks WHERE id = ?''', (task_id,))
    task = c.fetchone()
    conn.commit()
    conn.close()
    return task

createUsers()
createTasks()
# acceptTask('Emma', 1)
# acceptTask('Marie', 3)
# completeTask(1)
