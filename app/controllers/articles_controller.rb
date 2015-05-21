class ArticlesController < ApplicationController
  before_action :authenticate_user!

  def index
    @articles = Article.where(user_id: params[:user_id])
    render json: @articles
  end

  def show
    @article = Article.find(params[:id])
    render json: @article
  end
end
