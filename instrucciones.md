https://dev.twitch.tv/console

ID Cliente: jhxp58bns33lhrc7ue0l4glhvwg4dz Secret Key: aqpxrkjaadyc7sfmkdxr3pyz097h9r

https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=jhxp58bns33lhrc7ue0l4glhvwg4dz&redirect_uri=http://localhost:3000&scope=channel%3Amanage%3Apolls+channel%3Aread%3Apolls&state=aqpxrkjaadyc7sfmkdxr3pyz097h9r

code: y0ov7cjimihenq9svk284kbukx3yp1

curl -X POST 'https://id.twitch.tv/oauth2/token' -H 'Content-Type: application/x-www-form-urlencoded' -d 'client_id=jhxp58bns33lhrc7ue0l4glhvwg4dz&client_secret=aqpxrkjaadyc7sfmkdxr3pyz097h9r&code=y0ov7cjimihenq9svk284kbukx3yp1&grant_type=authorization_code&redirect_uri=http://localhost:3000'

RESPUESTA {"access_token":"37gr4cxrkj24rj87s2fvjyb70d43vn","expires_in":15306,"refresh_token":"6ppenuof1ayepmbwhzip21wcew2mgnb8lfz95vftuxy0rh6egi","scope":["chat:edit","chat:read"],"token_type":"bearer"}
