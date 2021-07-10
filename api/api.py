from flask import Flask, jsonify, request, json
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///search.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app);

class Query(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(200), nullable=False)
    search_type = db.Column(db.String(12), nullable=False)
    search_count = db.Column(db.Integer, default=1)

    def add_search_count(self):
        self.search_count = self.search_count + 1

    def __str__(self):
        return f'{self.id} {self.content}'

def query_serializer(query):
    return{
        "id": query.id,
        "content": query.content,
        "serach_type": query.search_type,
        "search_count": query.search_count
    }

@app.route('/api', methods=['GET'])
def index():
    return jsonify([*map(query_serializer, Query.query.all())])

@app.route('/api/add', methods=['POST'])
def add():
    request_data=json.loads(request.data)    
    query_instance = Query.query.filter_by(content=request_data["content"], search_type=request_data["search_type"]).first() or Query(content=request_data["content"], search_type=request_data["search_type"])
    
    if(Query.query.filter_by(content=request_data["content"], search_type=request_data["search_type"])):
        db.session.add(query_instance)
        query_instance.search_count = query_instance.search_count + 1
        db.session.commit()
    else:
        db.session.add(query_instance) 
        db.session.commit()
    
    return {'201': 'db updated sucessfully'}