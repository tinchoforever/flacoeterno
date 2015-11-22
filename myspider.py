import scrapy

class BlogSpider(scrapy.Spider):
    name = 'elflaco'
    start_urls = ['http://www.rock.com.ar/discos/2/2385.shtml']

    def parse(self, response):
        for url in response.css('a::attr("href")').extract():
        	yield scrapy.Request(response.urljoin(url), self.parse_titles)
        	

    def parse_titles(self, response):
        for post_title in response.css('div.blog-left p').extract():
            yield {'title': post_title}
