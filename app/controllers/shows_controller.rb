class ShowsController < ApplicationController
  def show
    @show = Show.find(params[:id])
    render :show
  end
end
