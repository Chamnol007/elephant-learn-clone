from sklearn.feature_extraction.text import CountVectorizer
from src.utils.fileReadAndWrite.read import FileRead
import pandas as pd


def my_tokenizer(doc):
    return str(doc).split(',')


class Vectorizer:
    def __init__(self):
        df = pd.read_csv(r'correction.csv', usecols=['correction', 'result'])
        self.vectorizer = CountVectorizer(tokenizer=my_tokenizer)
        self.vectorizer.fit_transform(df["correction"].values.astype('U'), ',').todense()