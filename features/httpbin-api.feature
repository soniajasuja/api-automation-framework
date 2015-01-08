Feature:
    Httpbin.org exposes various resources for HTTP request testing
    As Httpbin client I want to verify that all API resources are working as they should

    Scenario: Setting headers in GET request
        Given I set User-Agent header to apickli
        When I GET /get
        Then response body path $.headers.User-Agent should be apickli

    Scenario: Parsing response xml body
        When I GET /xml
        Then response body path /slideshow/slide[1]/title should be Wake up to WonderWidgets!