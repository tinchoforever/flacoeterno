# scrapy runspider letras-com.py -o items.json -t json

import scrapy

class BlogSpider(scrapy.Spider):
    name = 'elflaco'
    start_urls = ['https://www.letras.com/luis-alberto-spinetta/']

    def parse(self, response):
        for url in response.css('ul.cnt-list li a::attr("href")').extract():
        	yield scrapy.Request(response.urljoin(url), self.parse_titles)
        	

    def parse_titles(self, response):
        for post_title in response.css('div.cnt-letra p::text').extract():
            yield {'title': post_title}
