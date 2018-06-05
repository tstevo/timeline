from flask import render_template, jsonify
from app import app
from app import refresh
import json

@app.route('/')
@app.route('/index')
def index():
    posts = refresh.createlist()
    return render_template("index.html",
                           title='satelliteee',
                           posts=posts)

@app.route('/refresh', methods=['GET'])
def reload():
	posts = refresh.createlist()
	return jsonify(posts)
    #return jsonify({'title':'Home', 'posts':'whatever'})