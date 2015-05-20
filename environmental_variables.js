// @if RAILS_ENV='development'
{
  "constants": {
    "api_server_root": "\"http://api.staging.larktravel.com\"",
    "localRoot": "\"http://localhost:3000\""
  }
}
// @endif

// @if RAILS_ENV='test'
{
  "constants": {
    "api_server_root": "\"http://api.staging.larktravel.com\"",
    "localRoot": "\"http://localhost:5000\""
  }
}
// @endif

// @if RAILS_ENV='staging'
{
  "constants": {
    "api_server_root": "\"http://api.staging.larktravel.com\""
  }
}
// @endif

// @if RAILS_ENV='production'
{
  "constants": {
    "api_server_root": "\"http://api.staging.larktravel.com\""
  }
}
// @endif

