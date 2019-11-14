from src.preprocessing.data_cleaning.text_cleaning import ThaiTextCleaning
from src.preprocessing.tokenize.tokenization import Tokenization

if __name__ == '__main__':
    text = ThaiTextCleaning.removePunctuation(
        'SCB มีโครงการปรับโครงสร้างหนี้ รถยนต์ ผ่อนมาได้ 2 ปีกว่า ๆ อยากจะผ่อนน้อยลงกว่าเดิม มีท่านไดเคยทำมั้งครับ '
        'รบกวนข้อมูลหน่อยครับ ทำสัญญาไว้ 6 ปี ปัจจุบันผ่อนเดือนล่ะ 15,719  บาท ครับ')
    result = Tokenization.tokenize(text)

    print(result)
