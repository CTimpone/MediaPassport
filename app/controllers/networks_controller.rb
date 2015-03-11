class NetworksController < ApplicationController

  def show
    @shows = Show.where(network: params[:id].gsub('_',' '))
    @name = @shows.first.network
    render :show
  end
end
