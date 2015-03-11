class NetworksController < ApplicationController

  def show
    @network = Network.includes(:shows).find_by(name: params[:id].gsub('_',' '))
    render :show
  end

  def index
    @networks = Network.all
    render json: @networks
  end

  def create
    @network = Network.new(network_params)
    if @network.save
      render json: @network
    end
  end

  private
  def network_params
    params.require(:network).permit(:name)
  end
end
