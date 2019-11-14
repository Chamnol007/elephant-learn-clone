# from sklearn.feature_extraction.text import CountVectorizer
#
# corpus = [
#     'ตำราคุณปู่ ได้กล่าวไว้ ไม่เชื่อ ต้องตามดู',
#     'เปิดโดด ขึ้นมาแบบนี้ กด S กินตับฟรีอีกแล้ว ตับ ตับ ตับบบ',
#     'รอให้ลากต่อไม่ไหวแล้ว ล็อกกำไรไว้ก่อนดีกว่า',
#     'ฟิสปรับเอ้าลุคไทยขึ้นมั้งครับ หรั่งรักไทยหลงไทยมากขึ้น'
# ]
#
# vectorizer = CountVectorizer()
# print(vectorizer.fit_transform(corpus).todense())
# print(vectorizer.vocabulary_)

from sklearn.datasets import load_iris
from sklearn.linear_model import LogisticRegression

X, y = load_iris(return_X_y=True)
clf = LogisticRegression(random_state=0, solver='lbfgs', multi_class='multinomial').fit(X, y)
clf.predict(X[:2, :])
clf.predict_proba(X[:2, :])
clf.score(X, y)