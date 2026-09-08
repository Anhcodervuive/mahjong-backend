DELETE FROM "CmsSection" WHERE "pageId" IN (SELECT id FROM "CmsPage" WHERE slug = 'founder');

INSERT INTO "CmsSection" ("pageId", "key", "name", "order", "content")
SELECT 
    id, 
    'content', 
    'Founder Bio & Story', 
    0,
    '{"image": "/hashmat-pereira.jpg", "text_0_meet_the_founder": "Meet the Founder", "text_1_hashmat_pereira": "Hashmat Pereira", "text_2_founder_mahjong_success": "Founder, Mahjong Success", "text_3_a_passionate_advocate_of_lifel": "A passionate advocate of lifelong learning, strategic thinking, and community building through Mahjong.", "text_4_25_years_of_leadership_experie": "25+ Years of Leadership Experience", "text_5_hashmat_pereira": "Hashmat Pereira", "text_6_founder_mahjong_success": "Founder, Mahjong Success", "text_7_hashmat_pereira_is_the_founder": "Hashmat Pereira is the Founder of Mahjong Success and a passionate advocate of lifelong learning, strategic thinking, and community building through Mahjong.", "text_8_with_more_than_25_years_of_lea": "With more than 25 years of leadership experience, Hashmat has built, launched, and managed successful businesses, led large teams, developed products, training programmes, and delivered coaching and mentorship across multiple industries. Her career includes senior leadership roles with leading global and regional organisations including Mastercard, Citibank, Mashreq Bank, and Samba Financial Group.", "text_9_drawing_on_this_extensive_expe": "Drawing on this extensive experience in strategy, training, customer engagement, and business development, Hashmat created Mahjong Success to provide a structured and enjoyable pathway for players to learn, play, and master the board game Mahjong.", "text_10_the_story": "The Story", "text_11_from_corporate_leadership_to_s": "From Corporate Leadership to Social Community Building", "text_13_hashmat_s_vision_is_to_make_th": "Hashmat''s vision is to make the board game Mahjong accessible to people of all ages and backgrounds while building a vibrant community that brings together families, friends, students, professionals, and lifelong learners.", "text_14_through_mahjong_success_she_co": "Through Mahjong Success, she combines her expertise in training, events, strategy, and community building to create a unique learning and social experience that helps players connect, grow, and succeed.", "text_15_her_belief_is_simple_mahjong_i": "Her belief is simple: Mahjong is more than a game. It is a way to connect, learn, think strategically, and build relationships that last a lifetime.", "text_16__through_mahjong_success_we_br": "\"Through Mahjong Success, we bring together families, friends, students, professionals, and lifelong learners through the timeless game of Mahjong.\"", "text_17_learn_play_strategise_speed_su": "Learn. Play. Strategise. Speed. Succeed.", "text_18_hashmat_pereira": "Hashmat Pereira", "text_19__founder_mahjong_success": "— Founder, Mahjong Success", "text_20_learn_with_hashmat": "Learn with Hashmat", "text_21_book_your_first_session_and_ex": "Book your first session and experience the Mahjong Success approach — structured, enjoyable, and designed to give you confidence at the table.", "text_22_book_a_session": "Book a Session"}'::jsonb
FROM "CmsPage" 
WHERE slug = 'founder';

INSERT INTO "CmsSection" ("pageId", "key", "name", "order", "content")
SELECT 
    id, 
    'gallery', 
    'Moments Gallery', 
    1,
    '{"title": "A Glimpse Into the Journey", "subtitle": "Moments Behind Mahjong Success", "images": [{"src": "/moments/moment-1.png", "alt": "Hashmat Pereira arranging Mahjong tiles"}, {"src": "/moments/moment-2.png", "alt": "Hashmat Pereira playing Mahjong at the table"}, {"src": "/moments/moment-3.png", "alt": "Hashmat Pereira seated at a Mahjong table"}, {"src": "/moments/moment-4.png", "alt": "Hashmat Pereira holding a Mahjong tile"}, {"src": "/moments/moment-5.png", "alt": "Hashmat Pereira showing a Mahjong tile"}, {"src": "/moments/moment-6.png", "alt": "Hashmat Pereira portrait"}]}'::jsonb
FROM "CmsPage" 
WHERE slug = 'founder';
