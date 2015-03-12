class StaticPagesController < ApplicationController
  def root
    render "root.html.erb"
  end
end
