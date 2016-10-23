require('./heroku'); // Config Heroku ports
const Twit = require('twit'); // Lowercase for Heroku, but usually capitalized
const elonId = 789256792677179392; // AskElon user ID
const elons = [
    "I think it would be great to be born on Earth and to die on Mars. Just hopefully not at the point of impact.",
    "I went to Russia three times to negotiate purchasing an ICBM.",
    "Technically, if somebody were to stow aboard the cargo version of Dragon, they'd actually be fine. I mean, hopefully.",
    "Twenty launches a year, is not a crazy number at all. We expect that to occur without any miracles.",
    "The climate debate is an interesting one. If you ask any scientist, are you sure that human activity is causing global warming, any scientist should say no. Because you can not be sure. On the other hand, if you said, do you think we should put an arbitrary number of trillions of tons of CO2 into the atmosphere and just keep doing it until something bad happens, they'll probably say no too.",
    "the idea of lying on a beach as my main thing, just sounds like the worst - it sounds horrible to me. I would go bonkers. I would have to be on serious drugs.",
    "They can come back if they like, if they don't like it, of course. You get a free return ticket. There's sometimes a debate about going to Mars one-way and whether that makes things easier, and I think for the initial flights perhaps, but long term, to get the cost down, you need the spacecraft back. Whether the people come back is irrelevant, but you must have the ship back because those things are expensive. So anyone who wants to return can just jump on.",
    "if you can show people that there is a way, then there is plenty of will.",
    "Feel free to leave if I'm getting boring.",
    "I wish I could just stab that bloody thing through the heart.",
    "I really want SpaceX to help make life multi-planetary. I'd like to see a self-sustaining base on Mars.",
    "So, unless you're a mushroom, you're out of luck.",
    "I thought it was quite sad that the Apollo program represented the high water mark of space exploration. It was not something I was able to witness in real time, because I was -2 when they landed.",
    "Solar City is doing super well. They're growing at 50% to 100% a year with positive cash flow, which is pretty incredible. I just show up at the board meetings to hear the good news. It's really great.",
    "I always kind of think of Charlie and the Chocolate Factory when someone mentions the space elevator.",
    "Ya know, Wikipedia's actually pretty damn good. It's like 90% accurate. It's just not clear what 90%.",
    "Well, the United States is the least bad at encouraging innovation.",
    "If one set a standard that you couldn't have loss of life, then there would be no transport. You wouldn't even be allowed to walk.",
    "we'll have a production rate of about 400 booster engines per year. Which, I think, would be more engines than the rest of the world production combined. As it is, we're already more than the rest of US production combined. Although that's not saying much. Unfortunately.",
    "You know, we have 1% of the lobbying power of Boeing and Lockheed. If this decision is made as a function of lobbying power, we are screwed.",
    "I like lipstick, it's not like I've got anything against it. Can't wait for that comment to go out there.",
    "Making standard efficiency solar panels is about as hard as making dry wall. It's really easy. In fact, I'd say dry wall's probably harder.",
    "We're happy to take people the Moon. If somebody wants to go to the Moon, we can definitely do it.",
    "I think that we're unique in the launch business of publishing our prices on our website. Whereas other launch providers sort of treat it like a rug bazaar - they'll charge you what they think you can afford. We believe in every day low prices, you know, and we've stuck to our guns on that.",
    "the Falcon 9/Dragon system that we're launching today, what can it do? If the degree of safety required was equivalent to that of the shuttle, we could actually launch astronauts on the next flight.",
    "You've gotta.. you show a little leg, but not all of it.",
    "It's one hell of a golf cart. You go on the golf course with this puppy, you're really going to have a good time between the holes.",
    "I love being a political football.",
    "New technology and innovation can have a downside and one of the downsides is people are able to extract far more hydrocarbons than we thought were possible.",
    "It looks like a real alien spaceship",
    "That is how a 21-st century spaceship should land.",
    "Falcon Heavy costs about a third as much per flight as Delta IV Heavy, but carries twice as much payload to orbit, so it's effectively a six-fold improvement in the cost per pound to orbit.",
    "I don't think the government intends to stand in the way of innovation but sometimes it can over-regulate industries to the point where innovation becomes very difficult.",
    "With respect to air breathing hybrid stages, I have not seen how the physics of that makes sense. There may be some assumptions that I have that are incorrect, but really, for an orbital rocket, you're trying to get out of the atmosphere as soon as possible because the atmosphere is just as thick as soup when you're trying to go fast, and it's not helped by the fact that the atmosphere is mostly not oxygen.",
    "We do hire some MBAs but it's usually in spite of the MBA, not because of it.",
    "I'm trying to get back to my home planet, ya know.",
    "At the beginning of starting SpaceX I thought that the most likely outcome was failure.",
    "it's as though things automatically improve. They do not automatically improve!",
    "we try not to tell anyone outside the space business that it's for a rocket, because they assume rockets are made of magic.",
    "Let's say you made pencils, well, about 40% of your business would be with the government. That's not an unreasonable number.",
    "how much money do you think the Chinese government has put into solar? Estimates are about $40 billion. Okay? So, we've got our team operating on a pittance, and we've got China operating on $40 billion, and our team lost. That should be no surprise.",
    "I think NASA is actually doing a pretty good job overall.",
    "I wanted to have something that is really profoundly better than a gasoline car for driving long distance.",
    "Tesla, in the second half of this year, will produce more electric cars than it has produced in its entire lifetime to date. I feel very confident predicting that, within 20 years, the majority of new cars produced will be fully electric, and it may be closer to 10 years than 20.",
    "I think we've been very solid in keeping our prices steady and we do not expect to make price increases in the future except for inflation related adjustments.",
    "Although, it'd be nice to go inside.. but for that, we will need a comically fast set of stairs.",
    "If all we do is be yet another satellite launcher or something like that or ultimately only as good as Soyuz in cost per person to orbit, that would be okay, but really not a success in my book.",
    "So if someone had asked me, do you think Solyndra is a good investment, I would have said no, you're going to get your ass kicked.",
    "If you look at Russian rocketry, since the fall of the Soviet Union, there's really been no significant developments. The technology has barely progressed.",
    "the Atlas V cannot possibly be described as providing assured access to space for our nation when supply of its main engine depends on President Putin's permission.",
    "And frankly, if our rockets are good enough for NASA, why are they not good enough for the Air Force? It doesn't make sense.",
    "I think we had a critical mass of technical talent and just enough money and a design that was sensible and those were probably the three ingredients that resulted in success eventually.",
    "Now, the obvious problem with solar power is that the Sun does not shine at night. I think most people are aware of this.",
    "a lot of the major newspapers seem to be trying to answer the question: what is the worst thing that happened on Earth today?",
    "It seems logical that you should tax things that are most likely to be bad rather than - like, that's why we tax cigarettes and alcohol, because those are probably bad for you.",
    "It's important to bear in mind that we'd love to hire a lot more people than we currently hire but we also can't run out of money and die.",
    "The fast way is drop thermonuclear weapons over the poles.",
    "if humanity had taken an extra 10% longer to get here, it wouldn't have gotten here at all.",
    "SpaceX has a very long term mission. We want to just keep improving our technology until there's a city on Mars. Well, that could take a long time.",
    "Sometimes people are under the impression that NASA is the vast majority of our business, but actually they're the biggest single customer but they're only about a quarter of our orders.",
    "As long as we continue to throw away rockets and spacecraft, we will never have true access to space.",
    "Dragon is capable of reentering from even Mars velocities including lunar velocities, etc. It's a very capable vehicle and is not limited to simply low Earth orbit operations.",
    "In fact, at one point the judge actually had to remind the justice department lawyer that he works for the American people, not Boeing and Lockheed.",
    "No, we're not replacing NASA. NASA is our most important customer.",
    "They don't want a fair competition. They don't even want an unfair competition. They want no competition at all.",
    "Governments around the world certainly make a lot of noise about caring about the environment but the results are not very good.",
    "I mean, space is a dangerous thing.",
    "Lockheed and Boeing are used to stomping on new companies, and they've certainly tried to stomp on us.",
    "I mean, the market is like a manic depressive.",
    "No, if they've been punching us in the face, they shouldn't expect we're going to be their friend.",
    "Star Wars was the first movie I ever saw, so it was going to be fairly influential.",
    "In fact, certainly you can construct scenarios where recovery of human civilization does not occur.",
    "I think America is probably the only place where this would be possible, for a private company to get this far.",
    "I can whistle Pachelbel's Canon, which is a tricky one, but I'm not going to whistle for you now because that'd be too embarrassing.",
    "if you can get a group of really talented people together and unite them around a challenge and have them work together to the best of their abilities then a company will achieve great things.",
    "Will space travel be as ubiquitous as air travel? I don't think it will be as ubiquitous - I would love to say it is - but I don't believe the costs will ever get quite as affordable as air travel and hopefully I'm not gonna get fired by Elon for saying this. - Gwynne Shotwell",
    "In fact, it's something that obviously we're starting to do, with Gigafactory 1. The way we're approaching the Gigafactory is really like it's a product. We're not really thinking of it in the traditional way that people think of a factory. Like, a building with a bunch of off-the-shelf equipment in it. What we're really designing in the Gigafactory is a giant machine.",
    "I would never leave Tesla ever, but I may not be CEO forever. No-one should be CEO forever.",
    "really critical to the development of the SuperDraco engine was the ability to do 3d metal printing",
    "Ya know, there's a lot of people who think that human spaceflight should not be allowed in the commercial sector. It's sort of an odd position I think, but there's still a lot of people who feel that way.",
    "This entire night, everything you're experiencing is stored sunlight.",
    "Looking in the long term, and saying what's needed to create a city on Mars? Well, one thing's for sure: a lot of money.",
    "I actually tweeted out a link to the latest thing. Mostly the people on the NASA Spaceflight forum were able to fix the video.",
    "The success of Tesla as a company financially is going to be a function of the quality of the products that we produce. So we have to make better cars than, say, GM and Chrysler. I don't see that as a huge challenge.",
    "I've gone on record as saying I think we could do a super heavy development for on the order of two and a half billion, other estimates are about 10 times that. And the super heavy that I'm alluding to would have about a 160 ton to orbit capability, so way more than a Saturn V. In fact, I've even gone as far as to say that I will guarantee that personally. And stake everything on SpaceX that it will happen. So, I mean we'll see.",
    "Ya know, John McCain spent a lot of time in a prisoner of war camp - one would think he's not easily intimidated.",
    "This is intended to be a significant amount of revenue and help fund a city on Mars.",
    "we also need to make sure we don't create SkyNet.",
    "if you can make the product good enough that it so far exceeds people's expectations that it just makes them happy, I think that's amazing.",
    "So, it's not paranoia or made up, people did time in the big house. You can pretty much bet that's the tip of the iceberg.",
    "I really look forward to the day when every car on the road is electric. That's the goal, we want to make that happen.",
    "I think we've got a decent chance of bringing a stage back this year, which would be wonderful.",
    "there's no stone that hasn't been overturned, at least twice, to maximize the probability of success.",
    "If somebody can think of something better to do, I'd love to hear it.",
    "You know, couldn't really send people.. if they were alive.",
    "We want to open up space for humanity, and in order to do that, space must be affordable.",
    "we're looking at launches to be in the five to seven million dollar range - Gwynne Shotwell",
    "Basically, people need a compelling and affordable electric vehicle. That is the holy grail, and we're trying to get there as fast as we can.",
    "Flying cars sound cool, but they do make a lot of wind.  And they're quite noisy.  And the probability of something falling on your head is much higher.",
    "So there's the defensive reason: protecting the future of humanity and ensuring the light of consciousness is not extinguished should some calamity befall Earth.  But personally I find, what gets me more excited, is that this would be an incredible adventure.  It'd be like the greatest adventure ever.  It'd be exciting and inspiring.  And there need to be things that excite and inspire people.  There need to be reasons why you get up in the morning.  You can't just be solving problems, it's got to be 'somet",
    "The national security launches should be put up for competition. They should not be awarded on a sole-source uncompeted basis.",
    "We're probably going to have to iterate our way there I think.",
    "Most important of all is we did a good job for NASA. I always think, did we do a good job for our customer? Everything else is secondary to that.",
    "No, we wouldn't have come because it would have been quite rude to not have offered incentives.",
    "With each successive launch - we have several more launches this year - we expect to get more and more precise with the landing and, if all goes well, I am optimistic that we'll be able to land the stage back at Cape Canaveral by the end of the year.",
    "That's why I've committed to fund $10 million worth of AI safety research, and I'll probably do more.",
    "We're going to try to do for satellites what we've done for rockets.",
    "With artificial intelligence we are summoning the demon.",
    "I have a sleeping bag in a conference room adjacent to the production line which I use quite frequently",
    "Our autopilot capability right now is really good in two scenarios: either on a highway where there's no traffic and the lines are quite clear or in heavy traffic.  So it's super good in heavy traffic.  Not that I'd recommend it, but you can read a book or do email.  Is what I've found ...err heard people say.",
    "Do we want a future where we are forever confined to one planet until some eventual extinction event - however far in the future that might occur - or do we want to become a multi-planet species and then ultimately be out there among the stars, among many planets, among many star systems?  I think the latter is a far more exciting and inspiring future than the former.  And Mars is the next natural step.",
    "It's a world-changing experience.",
    "I would advocate starting with the simplest useful system.  So I'd probably advocate wheels.  And then you can sort of say 'OK it's working %u2026'  Essentially, if you're trying to create a company it's important to limit the number of miracles in series.",
    "30-35 million dollars... Imagine there was a pallet of cash, that was vomiting through the atmosphere, and it was going to burn up, and smash into tiny pieces. Would you try to save it? Probably yes. Yeah, that sounds like a good idea. Umm, So, yeah, we want to get it back.",
    "I thought 'it's probably not going to work.'  But then for the philanthropic mission, the greenhouse to Mars, I was 100% certain of losing the money that I put in there.  So being only 90% likely to lose it for SpaceX seemed like an improvement."
];
const bot = new Twit({
    consumer_key: 'rkWDuXPE4oVgqDbsOANVUtRvY',
    consumer_secret: process.env.consumer_secret,
    access_token: '789256792677179392-uPxPJ0aq9n67tcL6iisGWvQbQwEv6aw',
    access_token_secret: process.env.access_token_secret
});
bot.tweetReply = function(msg, reply_to) {
    bot.post('statuses/update', {
        status: msg,
        in_reply_to_status_id: reply_to
    }, function(err, data, response) {
        if (!err) {
            console.log("Tweet posted:");
            console.log(data);
        } else {
            console.log("ERR: " + err);
        }
    });
}

function getRandomElon() {
    var randInd = Math.floor(Math.random() * (elons.length + 1));
    return elons[randInd];
}

function getTweetableElon(userLength) {
    var elonQuote = getRandomElon();
    // 140 characters / tweet - (length of username and 1 character each for @ and space)
    var acceptableLength = 140 - (userLength + 2);
    while (elonQuote.length > acceptableLength) { // Make sure tweet is short enough
        elonQuote = getRandomElon();
    }
    return elonQuote;
}

const stream = bot.stream('user', {
    replies: "all"
});

stream.on('tweet', function(tweet) {
    console.log("Tweet received: " + tweet);
    var replyId = tweet.in_reply_to_user_id;
    var user = tweet.user;
    if (replyId) { // Is a reply
        if (user.id != elonId && replyId === elonId) { // Isn't AskElon and is a reply to AskElon
            var msg = "@" + user.screen_name + " " + getTweetableElon(user.screen_name.length);
            bot.tweetReply(msg, tweet.id_str);
        }
    }
});
console.log("Starting stream");
stream.start();
