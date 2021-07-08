from flask import Flask, jsonify, request, json
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///search.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app);

class Query(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(200), nullable=False)
    searchValue = db.Column(db.Integer, default=0)

    def add_search_count(self):
        self.searchValue = self.searchValue + 1

    def __str__(self):
        return f'{self.id} {self.content}'

def query_serializer(query):
    return{
        "id": query.id,
        "content": query.content,
        "searchValue": query.searchValue
    }

@app.route('/api', methods='GET')
def index():
    return jsonify([*map(query_serializer, Query.query.all())])

@app.route('/api/add', methods=['POST'])
def add():
    request_data=json.loads(request.data)
    query_instance = Query.query.filter_by(content=request_data["content"]) if Query.query.filter_by(content=request_data["content"]) else Query(content=request_data["content"], searchValue=1)

    db.session.add(query_instance) if Query.query.filter_by(content=request_data["content"]) else query_instance.add_search_count()


    db.session.commit()

    return {'201': 'db updated sucessfully'}