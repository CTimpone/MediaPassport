class NetworksController < ApplicationController

  def show
    @network = Network.includes(:shows).find(params[:id])
    render :show
  end
end
