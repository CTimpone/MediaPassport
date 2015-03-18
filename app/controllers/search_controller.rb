class SearchController < ApplicationController
  def index
    @results = PgSearch.multisearch(params["query"]).page(params["page"]).per(15);
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
