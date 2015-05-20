Rails.application.routes.draw do
=begin
  devise_for :users do
    resources :articles
  end
=end

  root 'welcome#index'

  resources :users do
    resources :articles
  end

end
