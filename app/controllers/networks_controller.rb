class NetworksController < ApplicationController

  def show
    @network = Network.find(params[:id])
    @shows = @network.shows
    render :show
  end
end
