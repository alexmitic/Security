dating-server:
	$(TROUPE)/bin/troupec dating-server.trp -o ./out/dating-server.js
	node $(TROUPE)/rt/built/troupe.js -f=./out/dating-server.js --id=../ids/id-server.json --trustmap=../trustmaps/server.json --aliases=aliases.json

dating-client:
	$(TROUPE)/bin/troupec dating-client.trp -o ./out/dating-client.js
	node $(TROUPE)/rt/built/troupe.js -f=./out/dating-client.js --trustmap=../trustmaps/client.json --id=../ids/id-client.json

dating-client2:
	$(TROUPE)/bin/troupec dating-client2.trp -o ./out/dating-client2.js
	node $(TROUPE)/rt/built/troupe.js -f=./out/dating-client2.js --trustmap=../trustmaps/client2.json --id=../ids/id-client2.json
