class SearchController < ApplicationController
  def index
    total = PgSearch.multisearch(params["query"]).page(1).total_count
    realPage = Integer(params["page"]) % (total / 10.0).ceil
    @results = PgSearch.multisearch(params["query"]).page(realPage).per(10);
    @final = []
    @results.each do |result|
      if result.searchable_type == "Episode"
        obj = Episode.find(result.searchable_id)
        episode = obj.attributes
        episode["type"] = "Episode"
        episode["show_title"] = obj.show.title
        @final.push(episode)
      else
        show = (Show.find(result.searchable_id)).attributes
        show["type"] = "Show"
        @final.push(show)
      end
    end
    render json: @final
  end
end
