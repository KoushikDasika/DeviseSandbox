Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: '/auth'

  root 'welcome#index'

  #devise_for :users

  resources :users do
    resources :articles
  end
end
