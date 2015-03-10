class ShowsController < ApplicationController
  def show
    @show = Show.includes(:episodes).find(params[:id])
    render :show
  end
end
