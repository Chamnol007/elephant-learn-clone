from src.model.vectorizer.vectorizer import Vectorizer
from src import main


def mutate_dict(f, d):
    for k, v in d.items():
        d[k] = {'text': k, 'value': f(v)}
    return d

class PostSummary:
    def __init__(self, post):
        self.post = post

    def generateWordCloud(self):
        print(self.post)
        comments = list(map(lambda x: x['content'], self.post['comments']))
        preprocessed_comments = map(main.preprocessing, comments)
        preprocessed_comments = list(filter(len, preprocessed_comments))
        vec = Vectorizer(preprocessed_comments)
        vec.transform()
        result = vec.getWords()
        mutate_dict(lambda x: int(x), result)
        return result
