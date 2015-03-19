json.extract! current_user, :username, :id, :email
json.set! :avatar_url, current_user.avatar.url
