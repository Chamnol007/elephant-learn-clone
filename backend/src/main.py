from src.utils.fileReadAndWrite.read import FileRead
from src.statistic.statistic import Statistic
from src.preprocessing.data_cleaning.text_cleaning import ThaiTextCleaning
from src.preprocessing.tokenize.tokenization import Tokenization
from src.preprocessing.spell_correction.spell import SpellCorrection
from src.preprocessing.stopword.stopword import StopWord
from src.preprocessing.sorting.sorting import Sorting
from src.utils.firebase.firebase import FirebaseHelper
import ast


def preprocessing(text):
    text_data = ThaiTextCleaning(text).clean()
    words = Tokenization.tokenize(text_data)
    # words_spell_check = map(SpellCorrection.getCorrection, words)
    # words_after_sort = Sorting.sort(words_spell_check)
    # print(words_after_sort)
    text = ','.join(c for c in words)
    return text

def convertComplexToFloat(num):
    return "%.16f" % float(num)


def token(text):
    result = Tokenization.tokenize(text)
    result = list(map(lambda x: x.strip(), result))
    result = list(filter(None, result))
    print(result)
    return result
    # words_spell_check = map(SpellCorrection.getCorrection, text)
    # # words_after_sort = Sorting.sort(words_spell_check)
    # # print(words_after_sort)
    # temp = ','.join(c for c in words_spell_check)
    # print(temp)
    # return temp


def clean(text):
    return ThaiTextCleaning(text).clean()


def stopword(text):
    text_array = ast.literal_eval(text)
    return StopWord().removeStopWord(text_array)


def correct(text):
    text_array = ast.literal_eval(text)
    temp = ','.join(c for c in text_array)
    return temp

def statistic(dates):
    df = FileRead.readCSV(r'../tmp/pantip_topic.csv', ['user_id', 'post_date', 'post_title'])

    df2 = FileRead.readCSV(r'../tmp/pantip_comment.csv', ['post_comments_userID', 'post_comments_time', 'post_date'])

    comment_stat = Statistic(df, df2, dates)

    result = {
        'post': comment_stat.get_statistic_data(),
        'comment': comment_stat.get_static_comment_data()
    }
    return result


if __name__ == '__main__':
    df = FileRead.readCSV(r'../tmp/data.csv', ['comment', 'result'])
    # df = df[~df['comment'].isnull()]
    # df = df[~df['result'].isnull()]
    # df = df[~df['result'].str.contains('undefined')]
    # print(df.describe())
    # # df = df.loc[:100]
    # df["cleaned"] = df["comment"].apply(clean)
    # df = df.drop(columns=['comment'])
    # df.to_csv('cleaned.csv', encoding='utf-8', index=False)

    # df = FileRead.readCSV(r'cleaned.csv', ['cleaned', 'result'])
    # df = df[~df['cleaned'].isnull()]
    # df = df[~df['result'].isnull()]
    # df = df[~df['cleaned'].str.contains('undefined')]
    # print(df.describe())
    # df["tokenized"] = df["cleaned"].apply(token)
    # df = df.drop(columns=['cleaned'])
    # df.to_csv('tokenized.csv', encoding='utf-8', index=False)

    # df = FileRead.readCSV(r'tokenized.csv', ['tokenized', 'result'])
    # df = df[~df['tokenized'].isnull()]
    # df = df[~df['result'].isnull()]
    # df = df[~df['tokenized'].str.contains('undefined')]
    # print(df.describe())
    # # df = df.loc[:10]
    # df["stopword"] = df["tokenized"].apply(stopword)
    # df = df.drop(columns=['tokenized'])
    # df.to_csv('stopword.csv', encoding='utf-8', index=False)

    # df = FileRead.readCSV(r'stopword.csv', ['stopword', 'result'])
    # df = df[~df['stopword'].isnull()]
    # df = df[df['result'].str.len() <= 2]
    # df = df[df['stopword'].str.len() > 0]
    # print(df.describe())
    # # df = df.loc[:10]
    # df["correction"] = df["stopword"].apply(correct)
    # df = df.drop(columns=['stopword'])
    # df.to_csv('correction.csv', encoding='utf-8', index=False)
    #
    # print('finish')
    # df = FileRead.readCSV(r'../tmp/pantip_topic.csv', ['user_id', 'post_date', 'post_title'])
    #
    # df2 = FileRead.readCSV(r'../tmp/pantip_comment.csv', ['post_comments_userID', 'post_comments_time', 'post_date'])
    #
    # comment_stat = Statistic(df, df2, ['07/22/2019','07/21/2019', '07/19/2019'])
    #
    # comment_stat.get_statistic_data()
    # comment_stat.get_static_comment_data()

    # df = FileRead.readCSV(r'../tmp/pantip_comment.csv', ['post_id', 'post_title', 'post_story'])
    #
    # print(df['post_title'].describe())
    #
    # df.drop_duplicates(subset=None, inplace=True)
    #
    # df.to_csv(r'../tmp/pantip_test.csv')

    # df = FileRead.readCSV(r'../tmp/pantip_comment.csv', ['post_id', 'post_comments','post_comments_userID', 'post_comments_time'])
    # df = df[~df['post_comments'].isnull()]
    # text = df['post_comments'].describe()
    # print(text)
    # for val in df.values:
    #     id = str(val[0]) + '_' + (val[3].replace('/', '_')).replace(' ', '_')
    #     data_to_upload = {
    #         id: {
    #             'id': id,
    #             'comment': val[1],
    #             'final': preprocessing(val[1]),
    #             'user_id': val[2],
    #             'time': val[3]
    #         }
    #     }
    #     # print(data_to_upload)
    #     FirebaseHelper().uploadDatabase('data/model/comment', data_to_upload)
    # preprocessing(text)
