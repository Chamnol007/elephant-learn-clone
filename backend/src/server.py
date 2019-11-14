from flask import Flask, escape, request, jsonify, render_template
from flask_cors import CORS
from random import *
from src import main
from src.scraping.comment.comment.spiders.pantip import PantipSpider
from src.summary.post.post_summary import PostSummary
from src.Vectorizer import Vectorizer
import pickle

model = pickle.load(open('model.pkl', "rb"))
vector = Vectorizer().vectorizer

app = Flask(__name__, static_url_path='', static_folder='outputs/html/statistic')
CORS(app)


@app.route('/')
def home():
    name = request.args.get("name", "World")
    return f'Hello, {escape(name)}!'


@app.route('/comment=<string:comment_id>')
def test_comment(comment_id):
    response = {
        'randomNumber': randint(1, 100)
    }
    return jsonify(response)


@app.route('/html')
def test_html_response():
    return app.send_static_file('statistic.html')


@app.route('/post=<string:post_id>')
def test_get_post_id(post_id):
    return jsonify(post_id)


# post comment
@app.route('/comment', methods=['POST'])
def preprocessing():
    data = request.get_json()
    result = main.preprocessing(data['content'])
    return jsonify(result)


@app.route('/pendingComment=<string:post_id>')
def ScrapNewCommentsFromPost(post_id):
    spider = PantipSpider()
    data = spider.parsePostByID(post_id)
    return jsonify(data)


@app.route('/postResult', methods=['POST'])
def getPostSummaryData():
    data = request.get_json()
    result = PostSummary(data).generateWordCloud()
    print(result)
    return jsonify(result)


@app.route('/vectorize', methods=['POST'])
def getVectorize():
    data = request.get_json()
    text = main.preprocessing(data['content'])
    return jsonify(text)
    # tet = vector.transform([text])
    # print(type(tet))
    # prob = model.predict_proba(tet)[0]
    # result = dict(result=int(model.predict(tet)),
    #               playability={'negative': main.convertComplexToFloat(prob[0]), 'neutral': main.convertComplexToFloat(prob[1]), 'positive': main.convertComplexToFloat(prob[2])})
    # return jsonify(result)

@app.route('/predict', methods=['POST'])
def get_predict():
    data = request.get_json()
    text = main.preprocessing(data['content'])
    tet = vector.transform([text])
    prob = model.predict_proba(tet)[0]
    result = dict(result=int(model.predict(tet)),
                  playability={'negative': main.convertComplexToFloat(prob[0]), 'neutral': main.convertComplexToFloat(prob[1]), 'positive': main.convertComplexToFloat(prob[2])})
    return jsonify(result)

@app.route('/statistic', methods=['POST'])
def get_statistic():
    data = request.get_json()
    print(data['content'])
    result = main.statistic(data['content'])
    print(result)
    return jsonify(result)


if __name__ == '__main__':
    app.run(debug=True)
