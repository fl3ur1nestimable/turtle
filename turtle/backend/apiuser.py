import sqlite3


def name_already_exist(name):
    db = sqlite3.connect('./database.db')
    cursor = db.cursor()
    cursor.execute(""" SELECT email FROM users WHERE username=?""", (name,))
    l = cursor.fetchall()
    db.close()
    return (l != [])


def mail_already_exist(mail):
    db = sqlite3.connect('./database.db')
    cursor = db.cursor()
    cursor.execute(""" SELECT username FROM users WHERE email=?""", (mail,))
    l = cursor.fetchall()
    db.close()
    return (l != [])


def addUser(username, mail, pwd):
    conn = sqlite3.connect('./database.db')
    c = conn.cursor()
    c.execute(''' INSERT INTO users (username,password,email) values(?,?,?)''',
              (username, pwd, mail))
    conn.commit()
    conn.close()


def get_id(username):
    db = sqlite3.connect('./database.db')
    cursor = db.cursor()
    cursor.execute(
        """ SELECT id_user FROM users WHERE username=?""", (username,))
    l = cursor.fetchall()
    db.close()
    return l[0][0]


def getUserPosted(username):
    conn = sqlite3.connect('./database.db')
    c = conn.cursor()
    c.execute('''SELECT * FROM tasks WHERE author=?''', (username,))
    tasks = c.fetchall()
    datatosend = []
    for task in tasks:
        datatosend.append({'id': task[0], 'author': task[1], 'title': task[2],
                          'description': task[3], 'price': task[4], 'status': task[7],'note_author':task[5],'note_acceptor':task[6]})
    conn.commit()
    conn.close()
    return datatosend


def getUserAccepted(username):
    conn = sqlite3.connect('./database.db')
    c = conn.cursor()
    c.execute(
        '''SELECT * FROM tasks WHERE id IN (SELECT task_id FROM accepted WHERE acceptor=?)''', (username,))
    tasks = c.fetchall()
    datatosend = []
    for task in tasks:
        datatosend.append({'id': task[0], 'author': task[1], 'title': task[2],
                          'description': task[3], 'price': task[4], 'status': task[7],'note':task[6]})
    conn.commit()
    conn.close()
    return datatosend


def getUserByMail(email):
    db = sqlite3.connect('./database.db')
    cursor = db.cursor()
    cursor.execute(""" SELECT username FROM users WHERE email=?""", (email,))
    l = cursor.fetchall()
    db.close()
    return l[0][0]
