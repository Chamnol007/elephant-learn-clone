from bokeh.models import HoverTool
from bokeh.plotting import figure, output_file, save
from pydash.strings import has_substr, split
import numpy
from src.utils.firebase.firebase import FirebaseHelper


class Statistic:
    def __init__(self, df, df_comment, dates):
        self.df = df
        self.df_comment = df_comment
        self.dates = dates
        self.firebase = FirebaseHelper()

    def generateGraph(self):

        # Take data  and present in a graph
        data = self.df
        data_summ = {}
        temp_date = split(data['post_date'][0], ' ')[0]
        counter = 0
        for val in data.values:
            if has_substr(val, temp_date):
                counter += 1
                data_summ.update({temp_date: counter})
            else:
                temp_date = split(val[1], ' ')[0]
                counter = 1
                data_summ.update({temp_date: counter})

        data_x = []
        data_y = []
        for key, value in data_summ.items():
            data_x.append(key)
            data_y.append(value)

        output_file("outputs/html/statistic/statistic.html")
        plot = figure(title='Pantip Sinthorn Post',
                      plot_height=400, plot_width=1200,
                      x_axis_label='Day', y_axis_label='Post',
                      x_range=data_x, y_range=(0, numpy.amax(data_y) + 20),
                      tools=['tap', 'save', 'reset'],
                      toolbar_location=None)
        plot.vbar(x=data_x, top=data_y, width=0.75, line_color="white", fill_color="orange", legend=None)

        plot.add_tools(HoverTool(tooltips=[("Date", "@x"), ("TOTAL", "@top")]))
        plot.toolbar.active_tap = 'auto'
        plot.sizing_mode = 'scale_width'
        plot.xgrid.grid_line_color = None
        plot.xaxis.major_label_orientation = 1
        plot.y_range.start = 0
        save(plot)

        stat = data['user_id'].describe()
        print(stat)
        data_to_upload = {
            'id': None,
            'byId': {
                '001': {
                    'id': '001',
                    'filepath': 'html/statistic/statistic.html',
                    'number_comments': int(stat['count']),
                    'number_users': int(stat['unique']),
                    'top_user': stat['top'],
                    'top_user_post': int(stat['freq'])
                }
            }
        }

        print(data_to_upload)
        self.firebase.uploadDatabase('data/statistic/test', data_to_upload)
        try:
            self.firebase.uploadFile('html/statistic/statistic.html', 'outputs/html/statistic/statistic.html')
            # self.firebase.uploadDatabase('data/statistic/test', data_to_upload)
        except:
            pass

    def get_statistic_data(self):
        data = self.df
        dates = self.dates
        data_summ = {}
        for d in dates:
            try:
                new_data = data[data['post_date'].str.contains(d)]
                stat_comment = new_data['user_id'].describe()
                data_summ.update({d: {
                    'id': d,
                    'number_post': int(stat_comment['count']),
                    'number_user': int(stat_comment['unique']),
                    'top_user': stat_comment['top'],
                    'top_user_post': int(stat_comment['freq'])
                }})
            except:
                pass
        return data_summ

    def get_static_comment_data(self):
        data = self.df_comment
        dates = self.dates
        data_summ = {}
        for d in dates:
            try:
                new_data = data[data['post_comments_time'].str.contains(d)]
                stat_comment = new_data['post_comments_userID'].describe()
                data_summ.update({d: {
                    'id': d,
                    'number_comment': int(stat_comment['count']),
                    'number_user': int(stat_comment['unique']),
                    'top_user': stat_comment['top'],
                    'top_user_comment': int(stat_comment['freq'])
                }})
            except:
                pass

        return data_summ
