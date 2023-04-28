import sqlite3

def name_already_exist(name):
    db = sqlite3.connect('./database.db')
    cursor = db.cursor()
    cursor.execute(""" SELECT email FROM users WHERE username=?""",(name,))
    l=cursor.fetchall()
    db.close()
    return (l!=[])

def mail_already_exist(mail):
    db = sqlite3.connect('./database.db')
    cursor = db.cursor()
    cursor.execute(""" SELECT username FROM users WHERE email=?""",(mail,))
    l=cursor.fetchall()
    db.close()
    return (l!=[])

def addUser(username,mail,pwd):
    conn = sqlite3.connect('./database.db')
    c = conn.cursor()
    c.execute(''' INSERT INTO users (username,password,email) values(?,?,?)''',(username,pwd,mail))
    conn.commit()
    conn.close()
    
def get_id(username):
    db = sqlite3.connect('./database.db')
    cursor = db.cursor()
    cursor.execute(""" SELECT id_user FROM users WHERE username=?""",(username,))
    l=cursor.fetchall()
    db.close()
    return l[0][0]
