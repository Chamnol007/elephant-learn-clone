from src.utils.fileReadAndWrite.read import FileRead
from src.preprocessing.data_cleaning.text_cleaning import ThaiTextCleaning
from src.preprocessing.tokenize.tokenization import Tokenization
from src.preprocessing.spell_correction.spell import SpellCorrection
from src.preprocessing.sorting.sorting import Sorting
from src.preprocessing.stemming.stemming import Stemming
from src.preprocessing.stopword.stopword import StopWord
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
import numpy as np

import pickle


def preprocessing(text):
    text_data = ThaiTextCleaning(text).clean()
    words = Tokenization.tokenize(text_data)
    words_spell_check = map(SpellCorrection.getCorrection, words)
    # words_after_sort = Sorting.sort(words_spell_check)
    # print(words_after_sort)
    word_after_stopword = StopWord().removeStopWord(words_spell_check)
    text = ','.join(c for c in word_after_stopword)
    # print(text)
    return text


def my_tokenizer(doc):
    return str(doc).split(',')


if __name__ == '__main__':
    logreg = LogisticRegression(random_state=0, solver='lbfgs', C=100)
    parameters_logreg = {
        'clf__C': (0.25, 0.5, 1.0),
        'clf__penalty': ('l1', 'l2')
    }
    df = FileRead.readCSV(r'correction.csv', ['correction', 'result'])
    # df = df[~df['comment'].isnull()]
    # df = df[~df['result'].isnull()]
    # df = df[~df['result'].str.contains('undefined')]
    # df = df.loc[:20]
    # df["preprocessed"] = df["comment"].apply(preprocessing)
    # text = df['comment'].describe()
    vectorizer = CountVectorizer(tokenizer=my_tokenizer)
    bag_of_words = vectorizer.fit_transform(df["correction"].values.astype('U'), ',').todense()
    X_train, X_test, y_train, y_test = train_test_split(bag_of_words, df['result'], test_size=0.25, random_state=100)
    # logreg.fit(bag_of_words, df['result'])
    logreg.fit(X_test, y_test)
    print(df["correction"][0:10])
    print(df["result"][0:10])
    print(logreg.predict(bag_of_words[0:10]))
    print(logreg.score(X_test, y_test))
    # print(df['result'][0:10])
    # pickle.dump(vectorizer, open('vector.pkl', "wb"))
    pickle.dump(logreg, open('model.pkl', 'wb'))
    print(vectorizer.get_feature_names())
    # tecx = preprocessing('ไม่แน่ว่าตัดยอดบัญชีผิดคนหรือเปล่า..เลยทำให้ไม่มีข้อมูล แก้ไขข้อความเมื่อ 19 กรกฎาคม เวลา 13:32 น.')
    # print(tecx)
    # test_pr = vectorizer.transform([tecx])
    predicted = logreg.predict(X_train)
    correctly_identified_y = predicted == y_train
    print(np.mean(correctly_identified_y) * 100)
    # df.to_csv('model.csv', encoding='utf-8', index=False)
    # df[:4000].to_csv('testtt.csv', encoding='utf-8', index=False)

