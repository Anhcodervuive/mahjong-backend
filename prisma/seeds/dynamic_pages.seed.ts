import { PrismaClient } from '@prisma/client';

export async function seedDynamicPages(prisma: PrismaClient) {

  console.log('Seeding why-mahjong-success...');
  
  // Ensure page exists
  const page_why_mahjong_success = await prisma.cmsPage.upsert({
    where: { slug: 'why-mahjong-success' },
    update: { title: 'why mahjong success' },
    create: { slug: 'why-mahjong-success', title: 'why mahjong success' },
  });

  await prisma.cmsSection.upsert({
    where: { pageId_key: { pageId: page_why_mahjong_success.id, key: 'why-mahjong-success_content' } },
    update: { content: {
  "text_0_building_better_players": "Building Better Players,",
  "text_1_one_tile_at_a_time": "One Tile at a Time",
  "text_2_at_mahjong_success_we_believe": "At Mahjong Success, we believe that learning Mahjong should be structured, enjoyable, and rewarding. Whether you're a complete beginner or an experienced player looking to refine your skills, we provide the guidance, community, and opportunities needed to help you succeed.",
  "text_3_start_your_journey": "Start Your Journey",
  "text_4_01_a_structured_path_to_succes": "01 — A Structured Path to Success",
  "text_5_every_level_builds_on_the_last": "Every Level Builds on the Last",
  "text_6_our_progressive_learning_pathw": "Our progressive learning pathway takes you step by step from the fundamentals to advanced gameplay, ensuring that every new skill builds naturally on the one before it.",
  "text_7_rather_than_overwhelming_playe": "Rather than overwhelming players with complex rules and strategies from the start, we focus on helping you develop confidence, understanding, and practical experience at every stage of your Mahjong journey. Each level introduces new concepts, techniques, and challenges designed to strengthen your skills and deepen your appreciation of the game.",
  "text_8_as_you_progress_through_the_pr": "As you progress through the programme, you'll learn to think more strategically, adapt to different game situations, build stronger hands, understand scoring, and become a more confident and versatile player.",
  "text_9_each_level_at_mahjong_success": "Each level at Mahjong Success is carefully designed to help you grow, improve, and achieve success one step at a time.",
  "text_10_02_learn_through_guided_instru": "02 — Learn Through Guided Instruction",
  "text_11_learn_it_play_it_master_it": "Learn It. Play It. Master It.",
  "text_12_at_mahjong_success_learning_do": "At Mahjong Success, learning doesn't stop with understanding the rules. We believe the best way to improve is through a combination of structured instruction and guided gameplay.",
  "text_13_benefit_from_expert_led_classe": "Benefit from expert-led classes, personalised guidance, and practical learning experiences designed to accelerate your progress. Whether through group sessions or one-to-one coaching, you'll receive the support needed to understand the game, improve your strategy, and play with confidence.",
  "text_14_guided_instruction": "Guided Instruction",
  "text_15_learn_the_fundamentals_strateg": "Learn the fundamentals, strategies, techniques, scoring systems, and Mahjong variants through structured lessons designed to build knowledge progressively.",
  "text_16_mahjong_variants_we_teach": "Mahjong Variants We Teach",
  "text_17_by_learning_different_mahjong": "By learning different Mahjong variants, you'll gain a deeper understanding of the game, discover new strategic approaches, and develop the confidence to play in a wide range of Mahjong environments.",
  "text_18_03_guided_play_sessions": "03 — Guided Play Sessions",
  "text_19_knowledge_becomes_skill_throug": "Knowledge Becomes Skill Through Practice",
  "text_20_our_expert_led_guided_play_ses": "Our expert-led guided play sessions allow players to participate in real games while receiving coaching, feedback, and strategic insights throughout the session.",
  "text_21_guided_play_sessions": "Guided Play Sessions",
  "text_22_knowledge_becomes_skill_throug": "Knowledge becomes skill through practice. These small-group sessions provide opportunities to apply what you've learned in a real-game environment with tutor support throughout.",
  "text_23_these_sessions_provide_opportu": "These sessions provide opportunities to",
  "text_24_guided_play_bridges_the_gap_be": "Guided play bridges the gap between learning and mastery, helping players become more confident, capable, and successful at the table.",
  "text_25_04_we_bring_mahjong_to_you": "04 — We Bring Mahjong to You",
  "text_26_learning_on_your_terms": "Learning on Your Terms",
  "text_27_our_travelling_instructors_can": "Our travelling instructors can conduct lessons at your home, office, community space, or preferred venue, allowing you to learn in a comfortable and familiar environment.",
  "text_28_whether_you_re_looking_for_one": "Whether you're looking for one-to-one coaching, private group lessons, family learning sessions, or customised training for friends and colleagues, we can tailor the experience to suit your schedule, location, and learning goals.",
  "text_29_enjoy_the_flexibility_of_learn": "Enjoy the flexibility of learning Mahjong where and when it works best for you.",
  "text_30_ideal_for": "Ideal For",
  "text_31_05_experience_a_variety_of_mah": "05 — Experience a Variety of Mahjong Games",
  "text_32_more_games_more_strategies_mor": "More Games. More Strategies. More Growth.",
  "text_33_at_each_level_students_are_int": "At each level, students are introduced to a carefully selected range of Mahjong games and formats designed to expand their thinking, challenge their decision-making, and develop new strategic skills. Rather than repeatedly playing the same game, you'll experience a variety of Mahjong styles — each with its own unique rules, objectives, and strategic considerations. Each level typically includes five or more game variations.",
  "text_34_by_learning_through_a_variety": "By learning through a variety of games, players remain engaged, challenged, and continuously growing throughout their Mahjong journey.",
  "text_35_06_join_the_mahjong_success_co": "06 — Join the Mahjong Success Community",
  "text_36_learning_is_better_together": "Learning is Better Together",
  "text_37_when_you_join_mahjong_success": "When you join Mahjong Success, you become part of a welcoming community of like-minded players who share a passion for learning, playing, networking, and growing together. Whether you're a beginner or an experienced player, you'll always find a friendly table waiting for you.",
  "text_38_community_benefits": "Community Benefits",
  "text_39_07_access_exclusive_mahjong_ev": "07 — Access Exclusive Mahjong Events, Socials & Tournaments",
  "text_40_continue_the_journey_beyond_th": "Continue the Journey Beyond the Classroom",
  "text_41_continue_your_mahjong_journey": "Continue your Mahjong journey beyond the classroom through our Mahjong Mania events, socials, tournaments, matches, meetups, offsites, and community gatherings. These experiences provide opportunities to practise your skills, meet new players, gain real-game experience, and enjoy Mahjong in a fun, engaging, and supportive environment.",
  "text_42_whether_you_prefer_casual_soci": "Whether you prefer casual social games, friendly matches, organised tournaments, or special Mahjong events, there is always an opportunity to learn, play, and connect with fellow enthusiasts.",
  "text_43_what_you_ll_have_access_to": "What You'll Have Access To",
  "text_44_from_your_first_social_game_to": "From your first social game to your first tournament victory, Mahjong Success provides opportunities to continue learning, building confidence, and enjoying the game.",
  "text_45_08_develop_skills_for_life_bui": "08 — Develop Skills for Life, Build a Stronger Mind for Success",
  "text_46_build_a_stronger_mind_for_succ": "Build a Stronger Mind for Success",
  "text_47_mahjong_is_much_more_than_a_ga": "Mahjong is much more than a game. It is a powerful exercise in strategic thinking, memory, concentration, observation, planning, and decision-making. Through every lesson and every game, players develop the ability to think ahead, recognise patterns, assess risks, solve problems, and adapt to changing situations. These skills not only improve Mahjong performance but also contribute to personal growth, lifelong learning, and success beyond the table.",
  "text_48_at_mahjong_success_we_believe": "At Mahjong Success, we believe that every game is an opportunity to sharpen your mind, challenge yourself, and continue growing.",
  "text_49_at_mahjong_success_we_believe": "At Mahjong Success, we believe that learning Mahjong is not only about becoming a better player — it is also about keeping your mind active, building meaningful relationships, and investing in your personal growth.",
  "text_50_whether_you_re_learning_for_re": "Whether you're learning for recreation, mental stimulation, social connection, or lifelong learning, Mahjong offers benefits that extend far beyond the game itself.",
  "text_51_start_your_journey_to_mahjong": "Start Your Journey to Mahjong Success",
  "text_52_contact_us_today_and_discover": "Contact us today and discover how you can Master Mahjong One Tile at a Time.",
  "text_53_book_a_session": "Book a Session"
} },
    create: {
      key: 'why-mahjong-success_content',
      name: 'Page Content',
      pageId: page_why_mahjong_success.id,
      content: {
  "text_0_building_better_players": "Building Better Players,",
  "text_1_one_tile_at_a_time": "One Tile at a Time",
  "text_2_at_mahjong_success_we_believe": "At Mahjong Success, we believe that learning Mahjong should be structured, enjoyable, and rewarding. Whether you're a complete beginner or an experienced player looking to refine your skills, we provide the guidance, community, and opportunities needed to help you succeed.",
  "text_3_start_your_journey": "Start Your Journey",
  "text_4_01_a_structured_path_to_succes": "01 — A Structured Path to Success",
  "text_5_every_level_builds_on_the_last": "Every Level Builds on the Last",
  "text_6_our_progressive_learning_pathw": "Our progressive learning pathway takes you step by step from the fundamentals to advanced gameplay, ensuring that every new skill builds naturally on the one before it.",
  "text_7_rather_than_overwhelming_playe": "Rather than overwhelming players with complex rules and strategies from the start, we focus on helping you develop confidence, understanding, and practical experience at every stage of your Mahjong journey. Each level introduces new concepts, techniques, and challenges designed to strengthen your skills and deepen your appreciation of the game.",
  "text_8_as_you_progress_through_the_pr": "As you progress through the programme, you'll learn to think more strategically, adapt to different game situations, build stronger hands, understand scoring, and become a more confident and versatile player.",
  "text_9_each_level_at_mahjong_success": "Each level at Mahjong Success is carefully designed to help you grow, improve, and achieve success one step at a time.",
  "text_10_02_learn_through_guided_instru": "02 — Learn Through Guided Instruction",
  "text_11_learn_it_play_it_master_it": "Learn It. Play It. Master It.",
  "text_12_at_mahjong_success_learning_do": "At Mahjong Success, learning doesn't stop with understanding the rules. We believe the best way to improve is through a combination of structured instruction and guided gameplay.",
  "text_13_benefit_from_expert_led_classe": "Benefit from expert-led classes, personalised guidance, and practical learning experiences designed to accelerate your progress. Whether through group sessions or one-to-one coaching, you'll receive the support needed to understand the game, improve your strategy, and play with confidence.",
  "text_14_guided_instruction": "Guided Instruction",
  "text_15_learn_the_fundamentals_strateg": "Learn the fundamentals, strategies, techniques, scoring systems, and Mahjong variants through structured lessons designed to build knowledge progressively.",
  "text_16_mahjong_variants_we_teach": "Mahjong Variants We Teach",
  "text_17_by_learning_different_mahjong": "By learning different Mahjong variants, you'll gain a deeper understanding of the game, discover new strategic approaches, and develop the confidence to play in a wide range of Mahjong environments.",
  "text_18_03_guided_play_sessions": "03 — Guided Play Sessions",
  "text_19_knowledge_becomes_skill_throug": "Knowledge Becomes Skill Through Practice",
  "text_20_our_expert_led_guided_play_ses": "Our expert-led guided play sessions allow players to participate in real games while receiving coaching, feedback, and strategic insights throughout the session.",
  "text_21_guided_play_sessions": "Guided Play Sessions",
  "text_22_knowledge_becomes_skill_throug": "Knowledge becomes skill through practice. These small-group sessions provide opportunities to apply what you've learned in a real-game environment with tutor support throughout.",
  "text_23_these_sessions_provide_opportu": "These sessions provide opportunities to",
  "text_24_guided_play_bridges_the_gap_be": "Guided play bridges the gap between learning and mastery, helping players become more confident, capable, and successful at the table.",
  "text_25_04_we_bring_mahjong_to_you": "04 — We Bring Mahjong to You",
  "text_26_learning_on_your_terms": "Learning on Your Terms",
  "text_27_our_travelling_instructors_can": "Our travelling instructors can conduct lessons at your home, office, community space, or preferred venue, allowing you to learn in a comfortable and familiar environment.",
  "text_28_whether_you_re_looking_for_one": "Whether you're looking for one-to-one coaching, private group lessons, family learning sessions, or customised training for friends and colleagues, we can tailor the experience to suit your schedule, location, and learning goals.",
  "text_29_enjoy_the_flexibility_of_learn": "Enjoy the flexibility of learning Mahjong where and when it works best for you.",
  "text_30_ideal_for": "Ideal For",
  "text_31_05_experience_a_variety_of_mah": "05 — Experience a Variety of Mahjong Games",
  "text_32_more_games_more_strategies_mor": "More Games. More Strategies. More Growth.",
  "text_33_at_each_level_students_are_int": "At each level, students are introduced to a carefully selected range of Mahjong games and formats designed to expand their thinking, challenge their decision-making, and develop new strategic skills. Rather than repeatedly playing the same game, you'll experience a variety of Mahjong styles — each with its own unique rules, objectives, and strategic considerations. Each level typically includes five or more game variations.",
  "text_34_by_learning_through_a_variety": "By learning through a variety of games, players remain engaged, challenged, and continuously growing throughout their Mahjong journey.",
  "text_35_06_join_the_mahjong_success_co": "06 — Join the Mahjong Success Community",
  "text_36_learning_is_better_together": "Learning is Better Together",
  "text_37_when_you_join_mahjong_success": "When you join Mahjong Success, you become part of a welcoming community of like-minded players who share a passion for learning, playing, networking, and growing together. Whether you're a beginner or an experienced player, you'll always find a friendly table waiting for you.",
  "text_38_community_benefits": "Community Benefits",
  "text_39_07_access_exclusive_mahjong_ev": "07 — Access Exclusive Mahjong Events, Socials & Tournaments",
  "text_40_continue_the_journey_beyond_th": "Continue the Journey Beyond the Classroom",
  "text_41_continue_your_mahjong_journey": "Continue your Mahjong journey beyond the classroom through our Mahjong Mania events, socials, tournaments, matches, meetups, offsites, and community gatherings. These experiences provide opportunities to practise your skills, meet new players, gain real-game experience, and enjoy Mahjong in a fun, engaging, and supportive environment.",
  "text_42_whether_you_prefer_casual_soci": "Whether you prefer casual social games, friendly matches, organised tournaments, or special Mahjong events, there is always an opportunity to learn, play, and connect with fellow enthusiasts.",
  "text_43_what_you_ll_have_access_to": "What You'll Have Access To",
  "text_44_from_your_first_social_game_to": "From your first social game to your first tournament victory, Mahjong Success provides opportunities to continue learning, building confidence, and enjoying the game.",
  "text_45_08_develop_skills_for_life_bui": "08 — Develop Skills for Life, Build a Stronger Mind for Success",
  "text_46_build_a_stronger_mind_for_succ": "Build a Stronger Mind for Success",
  "text_47_mahjong_is_much_more_than_a_ga": "Mahjong is much more than a game. It is a powerful exercise in strategic thinking, memory, concentration, observation, planning, and decision-making. Through every lesson and every game, players develop the ability to think ahead, recognise patterns, assess risks, solve problems, and adapt to changing situations. These skills not only improve Mahjong performance but also contribute to personal growth, lifelong learning, and success beyond the table.",
  "text_48_at_mahjong_success_we_believe": "At Mahjong Success, we believe that every game is an opportunity to sharpen your mind, challenge yourself, and continue growing.",
  "text_49_at_mahjong_success_we_believe": "At Mahjong Success, we believe that learning Mahjong is not only about becoming a better player — it is also about keeping your mind active, building meaningful relationships, and investing in your personal growth.",
  "text_50_whether_you_re_learning_for_re": "Whether you're learning for recreation, mental stimulation, social connection, or lifelong learning, Mahjong offers benefits that extend far beyond the game itself.",
  "text_51_start_your_journey_to_mahjong": "Start Your Journey to Mahjong Success",
  "text_52_contact_us_today_and_discover": "Contact us today and discover how you can Master Mahjong One Tile at a Time.",
  "text_53_book_a_session": "Book a Session"
}
    }
  });

  console.log('Seeding who-we-teach...');
  
  // Ensure page exists
  const page_who_we_teach = await prisma.cmsPage.upsert({
    where: { slug: 'who-we-teach' },
    update: { title: 'who we teach' },
    create: { slug: 'who-we-teach', title: 'who we teach' },
  });

  await prisma.cmsSection.upsert({
    where: { pageId_key: { pageId: page_who_we_teach.id, key: 'who-we-teach_content' } },
    update: { content: {
  "text_0_who_is_it_for": "Who is it for?",
  "text_1_a_seat_for_everyone": "A Seat for Everyone.",
  "text_2_whether_you_re_discovering_mah": "Whether you're discovering Mahjong for the first time or looking to deepen your skills, Mahjong Success welcomes players from all backgrounds, age groups, and experience levels.",
  "text_3_individual_players": "Individual Players",
  "text_4_for_every_player_at_every_stag": "For Every Player, at Every Stage",
  "text_5_groups_organisations": "Groups & Organisations",
  "text_6_we_also_work_with": "We Also Work With",
  "text_7_a_place_for_everyone": "A Place for Everyone",
  "text_8_anyone_looking_for_a_unique_so": "Anyone Looking for a Unique Social, Learning, or Team-Building Experience",
  "text_9_whether_your_goal_is_learning": "Whether your goal is learning, networking, family bonding, mental stimulation, or simply having fun, Mahjong Success offers a welcoming pathway to learn, play, connect, and succeed.",
  "text_10_ready_to_begin": "Ready to Begin?",
  "text_11_learn_together_play_together_s": "Learn Together. Play Together. Succeed Together.",
  "text_12_whatever_your_background_goal": "Whatever your background, goal, or experience level — there is a place for you at Mahjong Success.",
  "text_13_book_a_session": "Book a Session"
} },
    create: {
      key: 'who-we-teach_content',
      name: 'Page Content',
      pageId: page_who_we_teach.id,
      content: {
  "text_0_who_is_it_for": "Who is it for?",
  "text_1_a_seat_for_everyone": "A Seat for Everyone.",
  "text_2_whether_you_re_discovering_mah": "Whether you're discovering Mahjong for the first time or looking to deepen your skills, Mahjong Success welcomes players from all backgrounds, age groups, and experience levels.",
  "text_3_individual_players": "Individual Players",
  "text_4_for_every_player_at_every_stag": "For Every Player, at Every Stage",
  "text_5_groups_organisations": "Groups & Organisations",
  "text_6_we_also_work_with": "We Also Work With",
  "text_7_a_place_for_everyone": "A Place for Everyone",
  "text_8_anyone_looking_for_a_unique_so": "Anyone Looking for a Unique Social, Learning, or Team-Building Experience",
  "text_9_whether_your_goal_is_learning": "Whether your goal is learning, networking, family bonding, mental stimulation, or simply having fun, Mahjong Success offers a welcoming pathway to learn, play, connect, and succeed.",
  "text_10_ready_to_begin": "Ready to Begin?",
  "text_11_learn_together_play_together_s": "Learn Together. Play Together. Succeed Together.",
  "text_12_whatever_your_background_goal": "Whatever your background, goal, or experience level — there is a place for you at Mahjong Success.",
  "text_13_book_a_session": "Book a Session"
}
    }
  });

  console.log('Seeding players-different...');
  
  // Ensure page exists
  const page_players_different = await prisma.cmsPage.upsert({
    where: { slug: 'players-different' },
    update: { title: 'players different' },
    create: { slug: 'players-different', title: 'players different' },
  });

  await prisma.cmsSection.upsert({
    where: { pageId_key: { pageId: page_players_different.id, key: 'players-different_content' } },
    update: { content: {
  "text_0_the_mahjong_success_difference": "THE MAHJONG SUCCESS DIFFERENCE",
  "text_1_what_makes_a_mahjong_success_p": "What Makes a Mahjong Success Player Different?",
  "text_2_our_players_stand_out_at_every": "Our players stand out at every table — not just for how they play, but for how they carry themselves. Here is what sets a Mahjong Success player apart.",
  "text_3_10_defining_qualities": "10 DEFINING QUALITIES",
  "text_4_the_traits_that_define_our_pla": "The Traits That Define Our Players",
  "text_5_the_mahjong_success_difference": "The Mahjong Success Difference",
  "text_6_a_mahjong_success_player_is_re": "A Mahjong Success player is recognised by their preparation, respected for their etiquette, admired for their knowledge and strategy, and valued for the positive experience they bring to every table.",
  "text_7_learn_play_succeed": "Learn. Play. Succeed.",
  "text_8_begin_your_journey": "Begin Your Journey"
} },
    create: {
      key: 'players-different_content',
      name: 'Page Content',
      pageId: page_players_different.id,
      content: {
  "text_0_the_mahjong_success_difference": "THE MAHJONG SUCCESS DIFFERENCE",
  "text_1_what_makes_a_mahjong_success_p": "What Makes a Mahjong Success Player Different?",
  "text_2_our_players_stand_out_at_every": "Our players stand out at every table — not just for how they play, but for how they carry themselves. Here is what sets a Mahjong Success player apart.",
  "text_3_10_defining_qualities": "10 DEFINING QUALITIES",
  "text_4_the_traits_that_define_our_pla": "The Traits That Define Our Players",
  "text_5_the_mahjong_success_difference": "The Mahjong Success Difference",
  "text_6_a_mahjong_success_player_is_re": "A Mahjong Success player is recognised by their preparation, respected for their etiquette, admired for their knowledge and strategy, and valued for the positive experience they bring to every table.",
  "text_7_learn_play_succeed": "Learn. Play. Succeed.",
  "text_8_begin_your_journey": "Begin Your Journey"
}
    }
  });

  console.log('Seeding founder...');
  
  // Ensure page exists
  const page_founder = await prisma.cmsPage.upsert({
    where: { slug: 'founder' },
    update: { title: 'founder' },
    create: { slug: 'founder', title: 'founder' },
  });

  await prisma.cmsSection.upsert({
    where: { pageId_key: { pageId: page_founder.id, key: 'founder_content' } },
    update: { content: {
  "text_0_meet_the_founder": "Meet the Founder",
  "text_1_hashmat_pereira": "Hashmat Pereira",
  "text_2_founder_mahjong_success": "Founder, Mahjong Success",
  "text_3_a_passionate_advocate_of_lifel": "A passionate advocate of lifelong learning, strategic thinking, and community building through Mahjong.",
  "text_4_25_years_of_leadership_experie": "25+ Years of Leadership Experience",
  "text_5_hashmat_pereira": "Hashmat Pereira",
  "text_6_founder_mahjong_success": "Founder, Mahjong Success",
  "text_7_hashmat_pereira_is_the_founder": "Hashmat Pereira is the Founder of Mahjong Success and a passionate advocate of lifelong learning, strategic thinking, and community building through Mahjong.",
  "text_8_with_more_than_25_years_of_lea": "With more than 25 years of leadership experience, Hashmat has built, launched, and managed successful businesses, led large teams, developed products, training programmes, and delivered coaching and mentorship across multiple industries. Her career includes senior leadership roles with leading global and regional organisations including Mastercard, Citibank, Mashreq Bank, and Samba Financial Group.",
  "text_9_drawing_on_this_extensive_expe": "Drawing on this extensive experience in strategy, training, customer engagement, and business development, Hashmat created Mahjong Success to provide a structured and enjoyable pathway for players to learn, play, and master the board game Mahjong.",
  "text_10_the_story": "The Story",
  "text_11_from_corporate_leadership_to_s": "From Corporate Leadership to Social Community Building",
  "text_12_the_vision_behind_mahjong_succ": "The Vision Behind Mahjong Success",
  "text_13_hashmat_s_vision_is_to_make_th": "Hashmat's vision is to make the board game Mahjong accessible to people of all ages and backgrounds while building a vibrant community that brings together families, friends, students, professionals, and lifelong learners.",
  "text_14_through_mahjong_success_she_co": "Through Mahjong Success, she combines her expertise in training, events, strategy, and community building to create a unique learning and social experience that helps players connect, grow, and succeed.",
  "text_15_her_belief_is_simple_mahjong_i": "Her belief is simple: Mahjong is more than a game. It is a way to connect, learn, think strategically, and build relationships that last a lifetime.",
  "text_16__through_mahjong_success_we_br": "\"Through Mahjong Success, we bring together families, friends, students, professionals, and lifelong learners through the timeless game of Mahjong.\"",
  "text_17_learn_play_strategise_speed_su": "Learn. Play. Strategise. Speed. Succeed.",
  "text_18_hashmat_pereira": "Hashmat Pereira",
  "text_19__founder_mahjong_success": "— Founder, Mahjong Success",
  "text_20_learn_with_hashmat": "Learn with Hashmat",
  "text_21_book_your_first_session_and_ex": "Book your first session and experience the Mahjong Success approach — structured, enjoyable, and designed to give you confidence at the table.",
  "text_22_book_a_session": "Book a Session"
} },
    create: {
      key: 'founder_content',
      name: 'Page Content',
      pageId: page_founder.id,
      content: {
  "text_0_meet_the_founder": "Meet the Founder",
  "text_1_hashmat_pereira": "Hashmat Pereira",
  "text_2_founder_mahjong_success": "Founder, Mahjong Success",
  "text_3_a_passionate_advocate_of_lifel": "A passionate advocate of lifelong learning, strategic thinking, and community building through Mahjong.",
  "text_4_25_years_of_leadership_experie": "25+ Years of Leadership Experience",
  "text_5_hashmat_pereira": "Hashmat Pereira",
  "text_6_founder_mahjong_success": "Founder, Mahjong Success",
  "text_7_hashmat_pereira_is_the_founder": "Hashmat Pereira is the Founder of Mahjong Success and a passionate advocate of lifelong learning, strategic thinking, and community building through Mahjong.",
  "text_8_with_more_than_25_years_of_lea": "With more than 25 years of leadership experience, Hashmat has built, launched, and managed successful businesses, led large teams, developed products, training programmes, and delivered coaching and mentorship across multiple industries. Her career includes senior leadership roles with leading global and regional organisations including Mastercard, Citibank, Mashreq Bank, and Samba Financial Group.",
  "text_9_drawing_on_this_extensive_expe": "Drawing on this extensive experience in strategy, training, customer engagement, and business development, Hashmat created Mahjong Success to provide a structured and enjoyable pathway for players to learn, play, and master the board game Mahjong.",
  "text_10_the_story": "The Story",
  "text_11_from_corporate_leadership_to_s": "From Corporate Leadership to Social Community Building",
  "text_12_the_vision_behind_mahjong_succ": "The Vision Behind Mahjong Success",
  "text_13_hashmat_s_vision_is_to_make_th": "Hashmat's vision is to make the board game Mahjong accessible to people of all ages and backgrounds while building a vibrant community that brings together families, friends, students, professionals, and lifelong learners.",
  "text_14_through_mahjong_success_she_co": "Through Mahjong Success, she combines her expertise in training, events, strategy, and community building to create a unique learning and social experience that helps players connect, grow, and succeed.",
  "text_15_her_belief_is_simple_mahjong_i": "Her belief is simple: Mahjong is more than a game. It is a way to connect, learn, think strategically, and build relationships that last a lifetime.",
  "text_16__through_mahjong_success_we_br": "\"Through Mahjong Success, we bring together families, friends, students, professionals, and lifelong learners through the timeless game of Mahjong.\"",
  "text_17_learn_play_strategise_speed_su": "Learn. Play. Strategise. Speed. Succeed.",
  "text_18_hashmat_pereira": "Hashmat Pereira",
  "text_19__founder_mahjong_success": "— Founder, Mahjong Success",
  "text_20_learn_with_hashmat": "Learn with Hashmat",
  "text_21_book_your_first_session_and_ex": "Book your first session and experience the Mahjong Success approach — structured, enjoyable, and designed to give you confidence at the table.",
  "text_22_book_a_session": "Book a Session"
}
    }
  });

  console.log('Seeding goulash...');
  
  // Ensure page exists
  const page_goulash = await prisma.cmsPage.upsert({
    where: { slug: 'goulash' },
    update: { title: 'goulash' },
    create: { slug: 'goulash', title: 'goulash' },
  });

  await prisma.cmsSection.upsert({
    where: { pageId_key: { pageId: page_goulash.id, key: 'goulash_content' } },
    update: { content: {
  "text_0_international_goulash": "International Goulash",
  "text_1_master_international_goulash": "Master International Goulash",
  "text_2_a_structured_six_level_journey": "A structured six-level journey covering foundations, Joker strategy, advanced hand building, partnership play, concealed hands, and scoring mastery. Learn at your own pace with expert guidance.",
  "text_3_book_a_session": "Book a Session",
  "text_4_view_all_levels": "View All Levels",
  "text_5_your_learning_journey": "Your Learning Journey",
  "text_6_six_structured_levels_each_bui": "Six structured levels, each building on the last. Expand any level to explore its content.",
  "text_7_level": "Level",
  "text_8_overview": "Overview",
  "text_9_key_takeaways": "Key Takeaways",
  "text_10_advanced_hand_building_modules": "Advanced Hand Building Modules",
  "text_11_learning_outcome": "Learning Outcome",
  "text_12_book_level": "Book Level",
  "text_13_overview": "Overview",
  "text_14_learning_outcome": "Learning Outcome",
  "text_15_key_takeaways": "Key Takeaways",
  "text_16_book_level": "Book Level",
  "text_17_not_sure_where_to_start": "Not sure where to start?",
  "text_18_start_with_foundation": "Start with Foundation",
  "text_19_most_students_begin_at_level_1": "Most students begin at Level 1 and work through the journey progressively. All levels are available individually or as a package.",
  "text_20_book_foundation": "Book Foundation"
} },
    create: {
      key: 'goulash_content',
      name: 'Page Content',
      pageId: page_goulash.id,
      content: {
  "text_0_international_goulash": "International Goulash",
  "text_1_master_international_goulash": "Master International Goulash",
  "text_2_a_structured_six_level_journey": "A structured six-level journey covering foundations, Joker strategy, advanced hand building, partnership play, concealed hands, and scoring mastery. Learn at your own pace with expert guidance.",
  "text_3_book_a_session": "Book a Session",
  "text_4_view_all_levels": "View All Levels",
  "text_5_your_learning_journey": "Your Learning Journey",
  "text_6_six_structured_levels_each_bui": "Six structured levels, each building on the last. Expand any level to explore its content.",
  "text_7_level": "Level",
  "text_8_overview": "Overview",
  "text_9_key_takeaways": "Key Takeaways",
  "text_10_advanced_hand_building_modules": "Advanced Hand Building Modules",
  "text_11_learning_outcome": "Learning Outcome",
  "text_12_book_level": "Book Level",
  "text_13_overview": "Overview",
  "text_14_learning_outcome": "Learning Outcome",
  "text_15_key_takeaways": "Key Takeaways",
  "text_16_book_level": "Book Level",
  "text_17_not_sure_where_to_start": "Not sure where to start?",
  "text_18_start_with_foundation": "Start with Foundation",
  "text_19_most_students_begin_at_level_1": "Most students begin at Level 1 and work through the journey progressively. All levels are available individually or as a package.",
  "text_20_book_foundation": "Book Foundation"
}
    }
  });

  console.log('Seeding american-mahjong...');
  
  // Ensure page exists
  const page_american_mahjong = await prisma.cmsPage.upsert({
    where: { slug: 'american-mahjong' },
    update: { title: 'american mahjong' },
    create: { slug: 'american-mahjong', title: 'american mahjong' },
  });

  await prisma.cmsSection.upsert({
    where: { pageId_key: { pageId: page_american_mahjong.id, key: 'american-mahjong_content' } },
    update: { content: {
  "text_0_americal": "Americal",
  "text_1_master": "Master",
  "text_2_americal": "Americal",
  "text_3_master_charleston_passing_joke": "Master Charleston passing, Joker strategy, card-based gameplay, defensive play, and winning hand development through a structured learning journey.",
  "text_4_book_a_session": "Book a Session",
  "text_5_view_all_levels": "View All Levels",
  "text_6_your_learning_journey": "Your Learning Journey",
  "text_7_six_structured_levels_each_bui": "Six structured levels, each building on the last. Expand any level to explore its content.",
  "text_8_level": "Level",
  "text_9_overview": "Overview",
  "text_10_learning_outcome": "Learning Outcome",
  "text_11_key_takeaways": "Key Takeaways",
  "text_12_book_level": "Book Level",
  "text_13_not_sure_where_to_start": "Not sure where to start?",
  "text_14_start_with_foundation": "Start with Foundation",
  "text_15_most_students_begin_at_level_1": "Most students begin at Level 1 and work through the journey progressively. All levels are available individually or as a package.",
  "text_16_book_foundation": "Book Foundation"
} },
    create: {
      key: 'american-mahjong_content',
      name: 'Page Content',
      pageId: page_american_mahjong.id,
      content: {
  "text_0_americal": "Americal",
  "text_1_master": "Master",
  "text_2_americal": "Americal",
  "text_3_master_charleston_passing_joke": "Master Charleston passing, Joker strategy, card-based gameplay, defensive play, and winning hand development through a structured learning journey.",
  "text_4_book_a_session": "Book a Session",
  "text_5_view_all_levels": "View All Levels",
  "text_6_your_learning_journey": "Your Learning Journey",
  "text_7_six_structured_levels_each_bui": "Six structured levels, each building on the last. Expand any level to explore its content.",
  "text_8_level": "Level",
  "text_9_overview": "Overview",
  "text_10_learning_outcome": "Learning Outcome",
  "text_11_key_takeaways": "Key Takeaways",
  "text_12_book_level": "Book Level",
  "text_13_not_sure_where_to_start": "Not sure where to start?",
  "text_14_start_with_foundation": "Start with Foundation",
  "text_15_most_students_begin_at_level_1": "Most students begin at Level 1 and work through the journey progressively. All levels are available individually or as a package.",
  "text_16_book_foundation": "Book Foundation"
}
    }
  });

  console.log('Seeding taiwan-mahjong...');
  
  // Ensure page exists
  const page_taiwan_mahjong = await prisma.cmsPage.upsert({
    where: { slug: 'taiwan-mahjong' },
    update: { title: 'taiwan mahjong' },
    create: { slug: 'taiwan-mahjong', title: 'taiwan mahjong' },
  });

  await prisma.cmsSection.upsert({
    where: { pageId_key: { pageId: page_taiwan_mahjong.id, key: 'taiwan-mahjong_content' } },
    update: { content: {
  "text_0_taiwanese": "Taiwanese",
  "text_1_master": "Master",
  "text_2_taiwanese_mahjong": "Taiwanese Mahjong",
  "text_3_learn_traditional_taiwanese_ma": "Learn traditional Taiwanese Mahjong with strategic hand building, scoring systems, table etiquette, and advanced gameplay techniques.",
  "text_4_book_a_session": "Book a Session",
  "text_5_view_all_levels": "View All Levels",
  "text_6_your_learning_journey": "Your Learning Journey",
  "text_7_six_structured_levels_each_bui": "Six structured levels, each building on the last. Expand any level to explore its content.",
  "text_8_level": "Level",
  "text_9_overview": "Overview",
  "text_10_learning_outcome": "Learning Outcome",
  "text_11_key_takeaways": "Key Takeaways",
  "text_12_book_level": "Book Level",
  "text_13_not_sure_where_to_start": "Not sure where to start?",
  "text_14_start_with_foundation": "Start with Foundation",
  "text_15_most_students_begin_at_level_1": "Most students begin at Level 1 and work through the journey progressively. All levels are available individually or as a package.",
  "text_16_book_foundation": "Book Foundation"
} },
    create: {
      key: 'taiwan-mahjong_content',
      name: 'Page Content',
      pageId: page_taiwan_mahjong.id,
      content: {
  "text_0_taiwanese": "Taiwanese",
  "text_1_master": "Master",
  "text_2_taiwanese_mahjong": "Taiwanese Mahjong",
  "text_3_learn_traditional_taiwanese_ma": "Learn traditional Taiwanese Mahjong with strategic hand building, scoring systems, table etiquette, and advanced gameplay techniques.",
  "text_4_book_a_session": "Book a Session",
  "text_5_view_all_levels": "View All Levels",
  "text_6_your_learning_journey": "Your Learning Journey",
  "text_7_six_structured_levels_each_bui": "Six structured levels, each building on the last. Expand any level to explore its content.",
  "text_8_level": "Level",
  "text_9_overview": "Overview",
  "text_10_learning_outcome": "Learning Outcome",
  "text_11_key_takeaways": "Key Takeaways",
  "text_12_book_level": "Book Level",
  "text_13_not_sure_where_to_start": "Not sure where to start?",
  "text_14_start_with_foundation": "Start with Foundation",
  "text_15_most_students_begin_at_level_1": "Most students begin at Level 1 and work through the journey progressively. All levels are available individually or as a package.",
  "text_16_book_foundation": "Book Foundation"
}
    }
  });

  console.log('Seeding atf-mahjong...');
  
  // Ensure page exists
  const page_atf_mahjong = await prisma.cmsPage.upsert({
    where: { slug: 'atf-mahjong' },
    update: { title: 'atf mahjong' },
    create: { slug: 'atf-mahjong', title: 'atf mahjong' },
  });

  await prisma.cmsSection.upsert({
    where: { pageId_key: { pageId: page_atf_mahjong.id, key: 'atf-mahjong_content' } },
    update: { content: {
  "text_0_nmjl": "NMJL",
  "text_1_master": "Master",
  "text_2_nmjl": "NMJL",
  "text_3_develop_confidence_through_str": "Develop confidence through structured learning, strategic decision-making, scoring mastery, and progressive skill development.",
  "text_4_book_a_session": "Book a Session",
  "text_5_view_all_levels": "View All Levels",
  "text_6_your_learning_journey": "Your Learning Journey",
  "text_7_six_structured_levels_each_bui": "Six structured levels, each building on the last. Expand any level to explore its content.",
  "text_8_level": "Level",
  "text_9_overview": "Overview",
  "text_10_learning_outcome": "Learning Outcome",
  "text_11_key_takeaways": "Key Takeaways",
  "text_12_book_level": "Book Level",
  "text_13_not_sure_where_to_start": "Not sure where to start?",
  "text_14_start_with_foundation": "Start with Foundation",
  "text_15_most_students_begin_at_level_1": "Most students begin at Level 1 and work through the journey progressively. All levels are available individually or as a package.",
  "text_16_book_foundation": "Book Foundation"
} },
    create: {
      key: 'atf-mahjong_content',
      name: 'Page Content',
      pageId: page_atf_mahjong.id,
      content: {
  "text_0_nmjl": "NMJL",
  "text_1_master": "Master",
  "text_2_nmjl": "NMJL",
  "text_3_develop_confidence_through_str": "Develop confidence through structured learning, strategic decision-making, scoring mastery, and progressive skill development.",
  "text_4_book_a_session": "Book a Session",
  "text_5_view_all_levels": "View All Levels",
  "text_6_your_learning_journey": "Your Learning Journey",
  "text_7_six_structured_levels_each_bui": "Six structured levels, each building on the last. Expand any level to explore its content.",
  "text_8_level": "Level",
  "text_9_overview": "Overview",
  "text_10_learning_outcome": "Learning Outcome",
  "text_11_key_takeaways": "Key Takeaways",
  "text_12_book_level": "Book Level",
  "text_13_not_sure_where_to_start": "Not sure where to start?",
  "text_14_start_with_foundation": "Start with Foundation",
  "text_15_most_students_begin_at_level_1": "Most students begin at Level 1 and work through the journey progressively. All levels are available individually or as a package.",
  "text_16_book_foundation": "Book Foundation"
}
    }
  });

  console.log('Seeding guided-games...');
  
  // Ensure page exists
  const page_guided_games = await prisma.cmsPage.upsert({
    where: { slug: 'guided-games' },
    update: { title: 'guided games' },
    create: { slug: 'guided-games', title: 'guided games' },
  });

  await prisma.cmsSection.upsert({
    where: { pageId_key: { pageId: page_guided_games.id, key: 'guided-games_content' } },
    update: { content: {
  "text_0_session_options": "Session Options",
  "text_1_choose_your_guided_session": "Choose Your Guided Session",
  "text_2_two_formats_designed_for_diffe": "Two formats designed for different stages of your journey — pick the one that fits where you are now.",
  "text_3_guided_session": "Guided Session",
  "text_4_what_s_included": "What's included",
  "text_5_this_session_helps_you": "This session helps you",
  "text_6_guided_games": "Guided Games",
  "text_7_practice_builds_confidence": "Practice Builds Confidence.",
  "text_8_confidence_builds_success": "Confidence Builds Success.",
  "text_9_at_mahjong_success_understandi": "At Mahjong Success, understanding the rules is only the beginning. True learning happens when knowledge is applied through practice, experience, and guided play.",
  "text_10_join_the_circle": "Join the circle",
  "text_11_what_are_guided_games": "What are Guided Games?",
  "text_12_bridging_learning_and_doing": "Bridging Learning and Doing",
  "text_13_our_guided_games_sessions_are": "Our Guided Games sessions are designed to bridge the gap between learning and doing. By combining real-game experience with expert coaching, players have the opportunity to strengthen their understanding, refine their strategies, and build confidence at the Mahjong table.",
  "text_14_unlike_traditional_lessons_tha": "Unlike traditional lessons that focus primarily on instruction, Guided Games place you directly into gameplay situations where an experienced Mahjong trainer provides real-time guidance, coaching, feedback, and strategic insights. Players learn not only what to do, but",
  "text_15_why": "why",
  "text_16_they_should_do_it": "they should do it.",
  "text_17_whether_you_have_just_complete": "Whether you have just completed a training level, want to reinforce your learning, improve your decision-making, increase your gameplay speed, or prepare for the next stage of your Mahjong journey, Guided Games provide the perfect environment to develop your skills through practical experience.",
  "text_18_join_the_circle": "Join the circle",
  "text_19_what_you_ll_learn": "What You'll Learn",
  "text_20_skills_developed_through_guide": "Skills Developed Through Guided Play",
  "text_21_because_at_mahjong_success_we": "Because at Mahjong Success, we know that:",
  "text_22_knowledge_becomes_skill_throug": "Knowledge Becomes Skill Through Practice.",
  "text_23_and_with_practice_comes_confid": "And with practice comes confidence. With confidence comes success.",
  "text_24_join_the_circle": "Join the circle",
  "text_25_our_recommended_learning_path": "Our Recommended Learning Path",
  "text_26_a_progressive_journey_to_maste": "A Progressive Journey to Mastery",
  "text_27_mahjong_success_is_designed_as": "Mahjong Success is designed as a progressive learning journey. This pathway allows players to learn new concepts, practise them with support, build confidence through repetition, develop speed and consistency, and ultimately become fully prepared for the next stage of their journey.",
  "text_28_learn_through_instruction": "Learn Through Instruction.",
  "text_29_build_through_practice": "Build Through Practice.",
  "text_30_succeed_through_experience": "Succeed Through Experience.",
  "text_31_join_the_circle": "Join the circle",
  "text_32_ready_to_play_smarter": "Ready to Play Smarter?",
  "text_33_contact_us_today_to_book_a_gui": "Contact us today to book a Guided Games session and discover how expert coaching can help you build confidence, strengthen strategy, and accelerate your journey to Mahjong Success.",
  "text_34_join_the_circle": "Join the circle",
  "text_35_book_now": "Book Now",
  "text_36_master_mahjong_one_tile_at_a_t": "Master Mahjong One Tile at a Time."
} },
    create: {
      key: 'guided-games_content',
      name: 'Page Content',
      pageId: page_guided_games.id,
      content: {
  "text_0_session_options": "Session Options",
  "text_1_choose_your_guided_session": "Choose Your Guided Session",
  "text_2_two_formats_designed_for_diffe": "Two formats designed for different stages of your journey — pick the one that fits where you are now.",
  "text_3_guided_session": "Guided Session",
  "text_4_what_s_included": "What's included",
  "text_5_this_session_helps_you": "This session helps you",
  "text_6_guided_games": "Guided Games",
  "text_7_practice_builds_confidence": "Practice Builds Confidence.",
  "text_8_confidence_builds_success": "Confidence Builds Success.",
  "text_9_at_mahjong_success_understandi": "At Mahjong Success, understanding the rules is only the beginning. True learning happens when knowledge is applied through practice, experience, and guided play.",
  "text_10_join_the_circle": "Join the circle",
  "text_11_what_are_guided_games": "What are Guided Games?",
  "text_12_bridging_learning_and_doing": "Bridging Learning and Doing",
  "text_13_our_guided_games_sessions_are": "Our Guided Games sessions are designed to bridge the gap between learning and doing. By combining real-game experience with expert coaching, players have the opportunity to strengthen their understanding, refine their strategies, and build confidence at the Mahjong table.",
  "text_14_unlike_traditional_lessons_tha": "Unlike traditional lessons that focus primarily on instruction, Guided Games place you directly into gameplay situations where an experienced Mahjong trainer provides real-time guidance, coaching, feedback, and strategic insights. Players learn not only what to do, but",
  "text_15_why": "why",
  "text_16_they_should_do_it": "they should do it.",
  "text_17_whether_you_have_just_complete": "Whether you have just completed a training level, want to reinforce your learning, improve your decision-making, increase your gameplay speed, or prepare for the next stage of your Mahjong journey, Guided Games provide the perfect environment to develop your skills through practical experience.",
  "text_18_join_the_circle": "Join the circle",
  "text_19_what_you_ll_learn": "What You'll Learn",
  "text_20_skills_developed_through_guide": "Skills Developed Through Guided Play",
  "text_21_because_at_mahjong_success_we": "Because at Mahjong Success, we know that:",
  "text_22_knowledge_becomes_skill_throug": "Knowledge Becomes Skill Through Practice.",
  "text_23_and_with_practice_comes_confid": "And with practice comes confidence. With confidence comes success.",
  "text_24_join_the_circle": "Join the circle",
  "text_25_our_recommended_learning_path": "Our Recommended Learning Path",
  "text_26_a_progressive_journey_to_maste": "A Progressive Journey to Mastery",
  "text_27_mahjong_success_is_designed_as": "Mahjong Success is designed as a progressive learning journey. This pathway allows players to learn new concepts, practise them with support, build confidence through repetition, develop speed and consistency, and ultimately become fully prepared for the next stage of their journey.",
  "text_28_learn_through_instruction": "Learn Through Instruction.",
  "text_29_build_through_practice": "Build Through Practice.",
  "text_30_succeed_through_experience": "Succeed Through Experience.",
  "text_31_join_the_circle": "Join the circle",
  "text_32_ready_to_play_smarter": "Ready to Play Smarter?",
  "text_33_contact_us_today_to_book_a_gui": "Contact us today to book a Guided Games session and discover how expert coaching can help you build confidence, strengthen strategy, and accelerate your journey to Mahjong Success.",
  "text_34_join_the_circle": "Join the circle",
  "text_35_book_now": "Book Now",
  "text_36_master_mahjong_one_tile_at_a_t": "Master Mahjong One Tile at a Time."
}
    }
  });

  console.log('Seeding community...');
  
  // Ensure page exists
  const page_community = await prisma.cmsPage.upsert({
    where: { slug: 'community' },
    update: { title: 'community' },
    create: { slug: 'community', title: 'community' },
  });

  await prisma.cmsSection.upsert({
    where: { pageId_key: { pageId: page_community.id, key: 'community_content' } },
    update: { content: {
  "text_0_mahjong_success_circle": "Mahjong Success Circle",
  "text_1_mahjong_is_a_game_built_for_fo": "Mahjong is a game built for four. Our Circles bring players together beyond the classroom — for regular games, shared rituals, and lasting friendships.",
  "text_2_what_is_a_circle": "What is a Circle?",
  "text_3_a_circle_is_a_small_regular_gr": "A Circle is a small, regular group of Mahjong players who meet to play, learn, and connect. Unlike a casual game night, a Circle has continuity — the same people, the same table, building something together over time.",
  "text_4_each_circle_is_formed_from_pla": "Each Circle is formed from players at a similar level, so the game stays balanced and the conversation stays meaningful. Whether you join an existing Circle or help form a new one, you're stepping into a ready-made community.",
  "text_5_circles_meet_regularly_fortnig": "Circles meet regularly — fortnightly or monthly — in a relaxed, social setting. There's no pressure to perform. The goal is simple: show up, play well, and enjoy the company.",
  "text_6_join_the_circle": "Join the circle",
  "text_7_benefits_of_joining_a_circle": "Benefits of Joining a Circle",
  "text_8_the_classroom_teaches_you_how": "The classroom teaches you how to play. The Circle is where you truly learn — through repetition, conversation, and the particular magic of a game played with people you know.",
  "text_9_join_the_circle": "Join the circle",
  "text_10_how_it_works": "How It Works",
  "text_11_joining_a_circle_is_simple_we": "Joining a Circle is simple. We match you with players at your level, set a schedule that works for the group, and handle the rest.",
  "text_12_join_the_circle": "Join the circle",
  "text_13__the_best_games_are_played_wit": "\"The best games are played with people who keep coming back.\"",
  "text_14_a_circle_isn_t_just_about_mahj": "A Circle isn't just about Mahjong — it's about the rhythm of showing up, the pleasure of familiar company, and the quiet satisfaction of a game played well together. Once you find your table, everything else follows.",
  "text_15_join_the_circle": "Join the circle",
  "text_16_ready_to_find_your_circle": "Ready to Find Your Circle?",
  "text_17_tell_us_a_little_about_your_le": "Tell us a little about your level and availability. We'll match you with the right group and get you to the table.",
  "text_18_join_the_circle": "Join the circle",
  "text_19_book_a_session_first": "Book a Session First"
} },
    create: {
      key: 'community_content',
      name: 'Page Content',
      pageId: page_community.id,
      content: {
  "text_0_mahjong_success_circle": "Mahjong Success Circle",
  "text_1_mahjong_is_a_game_built_for_fo": "Mahjong is a game built for four. Our Circles bring players together beyond the classroom — for regular games, shared rituals, and lasting friendships.",
  "text_2_what_is_a_circle": "What is a Circle?",
  "text_3_a_circle_is_a_small_regular_gr": "A Circle is a small, regular group of Mahjong players who meet to play, learn, and connect. Unlike a casual game night, a Circle has continuity — the same people, the same table, building something together over time.",
  "text_4_each_circle_is_formed_from_pla": "Each Circle is formed from players at a similar level, so the game stays balanced and the conversation stays meaningful. Whether you join an existing Circle or help form a new one, you're stepping into a ready-made community.",
  "text_5_circles_meet_regularly_fortnig": "Circles meet regularly — fortnightly or monthly — in a relaxed, social setting. There's no pressure to perform. The goal is simple: show up, play well, and enjoy the company.",
  "text_6_join_the_circle": "Join the circle",
  "text_7_benefits_of_joining_a_circle": "Benefits of Joining a Circle",
  "text_8_the_classroom_teaches_you_how": "The classroom teaches you how to play. The Circle is where you truly learn — through repetition, conversation, and the particular magic of a game played with people you know.",
  "text_9_join_the_circle": "Join the circle",
  "text_10_how_it_works": "How It Works",
  "text_11_joining_a_circle_is_simple_we": "Joining a Circle is simple. We match you with players at your level, set a schedule that works for the group, and handle the rest.",
  "text_12_join_the_circle": "Join the circle",
  "text_13__the_best_games_are_played_wit": "\"The best games are played with people who keep coming back.\"",
  "text_14_a_circle_isn_t_just_about_mahj": "A Circle isn't just about Mahjong — it's about the rhythm of showing up, the pleasure of familiar company, and the quiet satisfaction of a game played well together. Once you find your table, everything else follows.",
  "text_15_join_the_circle": "Join the circle",
  "text_16_ready_to_find_your_circle": "Ready to Find Your Circle?",
  "text_17_tell_us_a_little_about_your_le": "Tell us a little about your level and availability. We'll match you with the right group and get you to the table.",
  "text_18_join_the_circle": "Join the circle",
  "text_19_book_a_session_first": "Book a Session First"
}
    }
  });

  console.log('Seeding mahjong-mania...');
  
  // Ensure page exists
  const page_mahjong_mania = await prisma.cmsPage.upsert({
    where: { slug: 'mahjong-mania' },
    update: { title: 'mahjong mania' },
    create: { slug: 'mahjong-mania', title: 'mahjong mania' },
  });

  await prisma.cmsSection.upsert({
    where: { pageId_key: { pageId: page_mahjong_mania.id, key: 'mahjong-mania_content' } },
    update: { content: {
  "text_0_mahjong_mania": "Mahjong Mania",
  "text_1_play_connect_celebrate": "Play. Connect. Celebrate.",
  "text_2_a_social_events_and_experience": "A social events and experiences platform dedicated to bringing people together through the joy of Mahjong.",
  "text_3_whether_you_re_looking_to_meet": "Whether you're looking to meet new players, host a memorable celebration, organise a corporate gathering, or simply enjoy a fun afternoon around the table, Mahjong Mania creates engaging and unforgettable Mahjong experiences for all occasions.",
  "text_4_contact_us": "Contact us",
  "text_5_what_we_offer": "WHAT WE OFFER",
  "text_6_experiences_for_every_occasion": "Experiences for Every Occasion",
  "text_7_ready_to_join_us": "Ready to Join Us?",
  "text_8_register_your_interest_for_an": "Register your interest for an upcoming event or get in touch to plan something special. We'd love to have you at the table.",
  "text_9_contact_us": "Contact us",
  "text_10_event_services": "EVENT SERVICES",
  "text_11_we_can_help_you": "We Can Help You",
  "text_12_contact_us": "Contact us",
  "text_13__every_mahjong_tile_tells_a_st": "\"Every Mahjong tile tells a story, and every game creates an opportunity to connect.\"",
  "text_14_whether_you_re_celebrating_a_b": "Whether you're celebrating a birthday, hosting a company event, gathering with friends, or joining one of our social sessions, Mahjong Mania brings people together through shared experiences, meaningful conversations, and the timeless enjoyment of Mahjong.",
  "text_15_come_for_the_mahjong_stay_for": "Come for the Mahjong. Stay for the memories.",
  "text_16_mahjong_offsites": "Mahjong Offsites",
  "text_17_looking_for_a_unique_and_engag": "Looking for a unique and engaging offsite experience for your team, organisation, community, or private group?",
  "text_18_our_mahjong_offsites_combine_s": "Our Mahjong Offsites combine strategic thinking, teamwork, social interaction, and friendly competition in a relaxed and enjoyable environment. Whether you're planning a corporate retreat, team-building session, client appreciation event, community gathering, or private group experience, we'll create a customised Mahjong event tailored to your objectives.",
  "text_19_from_venue_setup_and_facilitat": "From venue setup and facilitation to gameplay guidance and event management, we take care of every detail so you can focus on connecting, learning, and having fun.",
  "text_20_contact_us_today_to_book_your": "Contact Us Today to Book Your Premium Mahjong Off-Site Event and Create a Truly Memorable Experience",
  "text_21_join_a_mahjong_mania_event": "Join a Mahjong Mania Event",
  "text_22_whether_you_re_a_beginner_casu": "Whether you're a beginner, casual player, or experienced enthusiast, our socials, meetups, and celebrations are a great way to meet new people, enjoy the game, and build lasting friendships.",
  "text_23_contact_us": "Contact us"
} },
    create: {
      key: 'mahjong-mania_content',
      name: 'Page Content',
      pageId: page_mahjong_mania.id,
      content: {
  "text_0_mahjong_mania": "Mahjong Mania",
  "text_1_play_connect_celebrate": "Play. Connect. Celebrate.",
  "text_2_a_social_events_and_experience": "A social events and experiences platform dedicated to bringing people together through the joy of Mahjong.",
  "text_3_whether_you_re_looking_to_meet": "Whether you're looking to meet new players, host a memorable celebration, organise a corporate gathering, or simply enjoy a fun afternoon around the table, Mahjong Mania creates engaging and unforgettable Mahjong experiences for all occasions.",
  "text_4_contact_us": "Contact us",
  "text_5_what_we_offer": "WHAT WE OFFER",
  "text_6_experiences_for_every_occasion": "Experiences for Every Occasion",
  "text_7_ready_to_join_us": "Ready to Join Us?",
  "text_8_register_your_interest_for_an": "Register your interest for an upcoming event or get in touch to plan something special. We'd love to have you at the table.",
  "text_9_contact_us": "Contact us",
  "text_10_event_services": "EVENT SERVICES",
  "text_11_we_can_help_you": "We Can Help You",
  "text_12_contact_us": "Contact us",
  "text_13__every_mahjong_tile_tells_a_st": "\"Every Mahjong tile tells a story, and every game creates an opportunity to connect.\"",
  "text_14_whether_you_re_celebrating_a_b": "Whether you're celebrating a birthday, hosting a company event, gathering with friends, or joining one of our social sessions, Mahjong Mania brings people together through shared experiences, meaningful conversations, and the timeless enjoyment of Mahjong.",
  "text_15_come_for_the_mahjong_stay_for": "Come for the Mahjong. Stay for the memories.",
  "text_16_mahjong_offsites": "Mahjong Offsites",
  "text_17_looking_for_a_unique_and_engag": "Looking for a unique and engaging offsite experience for your team, organisation, community, or private group?",
  "text_18_our_mahjong_offsites_combine_s": "Our Mahjong Offsites combine strategic thinking, teamwork, social interaction, and friendly competition in a relaxed and enjoyable environment. Whether you're planning a corporate retreat, team-building session, client appreciation event, community gathering, or private group experience, we'll create a customised Mahjong event tailored to your objectives.",
  "text_19_from_venue_setup_and_facilitat": "From venue setup and facilitation to gameplay guidance and event management, we take care of every detail so you can focus on connecting, learning, and having fun.",
  "text_20_contact_us_today_to_book_your": "Contact Us Today to Book Your Premium Mahjong Off-Site Event and Create a Truly Memorable Experience",
  "text_21_join_a_mahjong_mania_event": "Join a Mahjong Mania Event",
  "text_22_whether_you_re_a_beginner_casu": "Whether you're a beginner, casual player, or experienced enthusiast, our socials, meetups, and celebrations are a great way to meet new people, enjoy the game, and build lasting friendships.",
  "text_23_contact_us": "Contact us"
}
    }
  });

  console.log('Seeding thinking-table...');
  
  // Ensure page exists
  const page_thinking_table = await prisma.cmsPage.upsert({
    where: { slug: 'thinking-table' },
    update: { title: 'thinking table' },
    create: { slug: 'thinking-table', title: 'thinking table' },
  });

  await prisma.cmsSection.upsert({
    where: { pageId_key: { pageId: page_thinking_table.id, key: 'thinking-table_content' } },
    update: { content: {
  "text_0_the_thinking_table": "The Thinking Table",
  "text_1_building_stronger_teams_throug": "Building Stronger Teams Through Strategic Play",
  "text_2_empowering_organisations_to_de": "Empowering organisations to develop sharper thinkers, stronger communicators, and more connected teams through the timeless strategy of Mahjong.",
  "text_3_key_benefits": "KEY BENEFITS",
  "text_4_what_your_organisation_gains": "What Your Organisation Gains",
  "text_5_contact_us": "Contact us",
  "text_6_ideal_for": "IDEAL FOR",
  "text_7_built_for_modern_workplaces": "Built for Modern Workplaces",
  "text_8_contact_us": "Contact us",
  "text_9_a_different_approach_to_learni": "A DIFFERENT APPROACH TO LEARNING",
  "text_10_experiential_not_classroom_bas": "Experiential, Not Classroom-Based",
  "text_11_unlike_traditional_classroom_b": "Unlike traditional classroom-based training, our programmes use experiential learning to engage participants through strategic play, real-time decision-making, observation, communication, and collaboration.",
  "text_12_the_result_is_a_highly_engagin": "The result is a highly engaging experience that participants remember long after the event is over.",
  "text_13_contact_us": "Contact us",
  "text_14_our_programmes": "OUR PROGRAMMES",
  "text_15_let_s_build_a_programme_that_w": "Let's Build a Programme That Works for Your Team",
  "text_16_contact_us": "Contact us",
  "text_17_why_hr_l_d_professionals_choos": "WHY HR & L&D PROFESSIONALS CHOOSE US",
  "text_18_a_smarter_way_to_develop_peopl": "A Smarter Way to Develop People",
  "text_19_in_today_s_workplace_organisat": "In today's workplace, organisations are looking for innovative ways to develop people, strengthen teams, and improve employee engagement. Our strategic Mahjong-based learning experiences provide a unique alternative to traditional training programmes by combining learning, collaboration, and fun in a highly interactive environment.",
  "text_20_designed_for_human_resources_l": "Designed for Human Resources, Learning & Development, Employee Engagement, and Corporate Wellness teams, these programmes help participants develop valuable workplace skills while fostering stronger relationships across teams.",
  "text_21_contact_us": "Contact us",
  "text_22_ready_to_transform_your_team": "Ready to Transform Your Team?",
  "text_23_we_design_customised_experienc": "We design customised experiences tailored to your organisation's goals — adaptable to different team sizes, learning objectives, and event formats.",
  "text_24_contact_us": "Contact us"
} },
    create: {
      key: 'thinking-table_content',
      name: 'Page Content',
      pageId: page_thinking_table.id,
      content: {
  "text_0_the_thinking_table": "The Thinking Table",
  "text_1_building_stronger_teams_throug": "Building Stronger Teams Through Strategic Play",
  "text_2_empowering_organisations_to_de": "Empowering organisations to develop sharper thinkers, stronger communicators, and more connected teams through the timeless strategy of Mahjong.",
  "text_3_key_benefits": "KEY BENEFITS",
  "text_4_what_your_organisation_gains": "What Your Organisation Gains",
  "text_5_contact_us": "Contact us",
  "text_6_ideal_for": "IDEAL FOR",
  "text_7_built_for_modern_workplaces": "Built for Modern Workplaces",
  "text_8_contact_us": "Contact us",
  "text_9_a_different_approach_to_learni": "A DIFFERENT APPROACH TO LEARNING",
  "text_10_experiential_not_classroom_bas": "Experiential, Not Classroom-Based",
  "text_11_unlike_traditional_classroom_b": "Unlike traditional classroom-based training, our programmes use experiential learning to engage participants through strategic play, real-time decision-making, observation, communication, and collaboration.",
  "text_12_the_result_is_a_highly_engagin": "The result is a highly engaging experience that participants remember long after the event is over.",
  "text_13_contact_us": "Contact us",
  "text_14_our_programmes": "OUR PROGRAMMES",
  "text_15_let_s_build_a_programme_that_w": "Let's Build a Programme That Works for Your Team",
  "text_16_contact_us": "Contact us",
  "text_17_why_hr_l_d_professionals_choos": "WHY HR & L&D PROFESSIONALS CHOOSE US",
  "text_18_a_smarter_way_to_develop_peopl": "A Smarter Way to Develop People",
  "text_19_in_today_s_workplace_organisat": "In today's workplace, organisations are looking for innovative ways to develop people, strengthen teams, and improve employee engagement. Our strategic Mahjong-based learning experiences provide a unique alternative to traditional training programmes by combining learning, collaboration, and fun in a highly interactive environment.",
  "text_20_designed_for_human_resources_l": "Designed for Human Resources, Learning & Development, Employee Engagement, and Corporate Wellness teams, these programmes help participants develop valuable workplace skills while fostering stronger relationships across teams.",
  "text_21_contact_us": "Contact us",
  "text_22_ready_to_transform_your_team": "Ready to Transform Your Team?",
  "text_23_we_design_customised_experienc": "We design customised experiences tailored to your organisation's goals — adaptable to different team sizes, learning objectives, and event formats.",
  "text_24_contact_us": "Contact us"
}
    }
  });

  console.log('Seeding fast-track-bundles...');
  
  // Ensure page exists
  const page_fast_track_bundles = await prisma.cmsPage.upsert({
    where: { slug: 'fast-track-bundles' },
    update: { title: 'fast track bundles' },
    create: { slug: 'fast-track-bundles', title: 'fast track bundles' },
  });

  await prisma.cmsSection.upsert({
    where: { pageId_key: { pageId: page_fast_track_bundles.id, key: 'fast-track-bundles_content' } },
    update: { content: {
  "text_0_mahjong_success": "Mahjong Success",
  "text_1_fastrack_bundles": "Fastrack Bundles",
  "text_2_accelerate_your_journey_to_mah": "Accelerate your journey to Mahjong Success. Bundled learning pathways and packages that combine multiple training levels into a structured programme — for players ready to progress faster and build skills more efficiently.",
  "text_3_book_a_bundle_session": "Book a Bundle Session",
  "text_4_what_s_included": "What's Included",
  "text_5_outcome": "Outcome",
  "text_6_bundle_offer": "Bundle Offer",
  "text_7_book_this_bundle": "Book This Bundle",
  "text_8_contact_us_at_info_mahjongsucc": "Contact us at info@mahjongsuccess.com to enquire",
  "text_9_perfect_for": "Perfect For",
  "text_10_ready_to_progress_faster": "Ready to Progress Faster?",
  "text_11_choose_your_bundle_and_begin": "Choose Your Bundle and Begin",
  "text_12_all_bundles_are_available_for": "All bundles are available for booking through our standard session flow. Select your preferred date, time, and experience — then choose your bundle on the booking screen.",
  "text_13_book_a_session": "Book a Session"
} },
    create: {
      key: 'fast-track-bundles_content',
      name: 'Page Content',
      pageId: page_fast_track_bundles.id,
      content: {
  "text_0_mahjong_success": "Mahjong Success",
  "text_1_fastrack_bundles": "Fastrack Bundles",
  "text_2_accelerate_your_journey_to_mah": "Accelerate your journey to Mahjong Success. Bundled learning pathways and packages that combine multiple training levels into a structured programme — for players ready to progress faster and build skills more efficiently.",
  "text_3_book_a_bundle_session": "Book a Bundle Session",
  "text_4_what_s_included": "What's Included",
  "text_5_outcome": "Outcome",
  "text_6_bundle_offer": "Bundle Offer",
  "text_7_book_this_bundle": "Book This Bundle",
  "text_8_contact_us_at_info_mahjongsucc": "Contact us at info@mahjongsuccess.com to enquire",
  "text_9_perfect_for": "Perfect For",
  "text_10_ready_to_progress_faster": "Ready to Progress Faster?",
  "text_11_choose_your_bundle_and_begin": "Choose Your Bundle and Begin",
  "text_12_all_bundles_are_available_for": "All bundles are available for booking through our standard session flow. Select your preferred date, time, and experience — then choose your bundle on the booking screen.",
  "text_13_book_a_session": "Book a Session"
}
    }
  });

  console.log('Seeding premium-experiences...');
  
  // Ensure page exists
  const page_premium_experiences = await prisma.cmsPage.upsert({
    where: { slug: 'premium-experiences' },
    update: { title: 'premium experiences' },
    create: { slug: 'premium-experiences', title: 'premium experiences' },
  });

  await prisma.cmsSection.upsert({
    where: { pageId_key: { pageId: page_premium_experiences.id, key: 'premium-experiences_content' } },
    update: { content: {
  "text_0_exclusive_to_mahjong_success": "Exclusive to Mahjong Success",
  "text_1_premium_mahjong": "Premium Mahjong",
  "text_2_experiences": "Experiences",
  "text_3_your_venue_your_schedule_your": "Your Venue. Your Schedule. Your Mahjong Success.",
  "text_4_we_understand_that_not_everyon": "We understand that not everyone can learn or play according to a fixed schedule or location. That's why we offer flexible premium options that bring Mahjong directly to you.",
  "text_5_book_a_premium_experience": "Book a Premium Experience",
  "text_6_whether_you_prefer_a_tutor_at": "Whether you prefer a tutor at your home or community venue, or would like to arrange a private training or guided play session at a time that suits your group, our Premium Mahjong Experiences are designed around your convenience.",
  "text_7_ideal_for_families_friends_com": "Ideal for families, friends, community groups, corporate teams, and private gatherings — these customised experiences provide the flexibility to learn, practise, and enjoy Mahjong in a setting that works best for you.",
  "text_8_minimum_group_size_4_players": "Minimum Group Size: 4 Players",
  "text_9_required_for_all_premium_mahjo": "Required for all Premium Mahjong Experience options.",
  "text_10_option_01": "Option 01",
  "text_11_travelling_tutor": "Travelling Tutor",
  "text_12_we_bring_mahjong_to_you": "We Bring Mahjong to You",
  "text_13_prefer_to_learn_in_the_comfort": "Prefer to learn in the comfort of your home or community? A trained and licensed Mahjong Success tutor comes to your preferred location, allowing you to learn at a place that is most convenient for you.",
  "text_14_book_now": "Book Now",
  "text_15_ideal_for": "Ideal For",
  "text_16_additional_investment": "Additional Investment",
  "text_17_aed_100": "AED 100",
  "text_18_per_person": "per person",
  "text_19_added_to_the_standard_programm": "Added to the standard programme fee. Covers tutor travel time, transportation, and the convenience of on-site instruction.",
  "text_20_minimum_4_players_required": "Minimum 4 players required",
  "text_21_ideal_for": "Ideal For",
  "text_22_additional_investment": "Additional Investment",
  "text_23_aed_100": "AED 100",
  "text_24_per_person": "per person",
  "text_25_added_to_the_standard_programm": "Added to the standard programme or guided play fee. Provides greater flexibility, personalised attention, and the convenience of learning or playing at a time that works best for you and your group.",
  "text_26_minimum_4_players_required": "Minimum 4 players required",
  "text_27_option_02": "Option 02",
  "text_28_play_at_your_convenience": "Play at Your Convenience",
  "text_29_your_group_your_time_your_tabl": "Your Group. Your Time. Your Table.",
  "text_30_would_you_like_a_private_sessi": "Would you like a private session outside the regular Mahjong Success training and play schedule? Whether it's a private training session, guided game, family session, community gathering, or private play group, we can arrange a dedicated tutor and customised schedule to suit your needs.",
  "text_31_book_now": "Book Now",
  "text_32_get_started": "Get Started",
  "text_33_ready_to_bring_the_mahjong_suc": "Ready to bring the Mahjong Success experience to your preferred venue or time?",
  "text_34_reach_out_and_we_ll_design_a_p": "Reach out and we'll design a programme that works perfectly for your group.",
  "text_35_learn_anywhere_play_anywhere": "Learn Anywhere. Play Anywhere.",
  "text_36_succeed_anywhere": "Succeed Anywhere."
} },
    create: {
      key: 'premium-experiences_content',
      name: 'Page Content',
      pageId: page_premium_experiences.id,
      content: {
  "text_0_exclusive_to_mahjong_success": "Exclusive to Mahjong Success",
  "text_1_premium_mahjong": "Premium Mahjong",
  "text_2_experiences": "Experiences",
  "text_3_your_venue_your_schedule_your": "Your Venue. Your Schedule. Your Mahjong Success.",
  "text_4_we_understand_that_not_everyon": "We understand that not everyone can learn or play according to a fixed schedule or location. That's why we offer flexible premium options that bring Mahjong directly to you.",
  "text_5_book_a_premium_experience": "Book a Premium Experience",
  "text_6_whether_you_prefer_a_tutor_at": "Whether you prefer a tutor at your home or community venue, or would like to arrange a private training or guided play session at a time that suits your group, our Premium Mahjong Experiences are designed around your convenience.",
  "text_7_ideal_for_families_friends_com": "Ideal for families, friends, community groups, corporate teams, and private gatherings — these customised experiences provide the flexibility to learn, practise, and enjoy Mahjong in a setting that works best for you.",
  "text_8_minimum_group_size_4_players": "Minimum Group Size: 4 Players",
  "text_9_required_for_all_premium_mahjo": "Required for all Premium Mahjong Experience options.",
  "text_10_option_01": "Option 01",
  "text_11_travelling_tutor": "Travelling Tutor",
  "text_12_we_bring_mahjong_to_you": "We Bring Mahjong to You",
  "text_13_prefer_to_learn_in_the_comfort": "Prefer to learn in the comfort of your home or community? A trained and licensed Mahjong Success tutor comes to your preferred location, allowing you to learn at a place that is most convenient for you.",
  "text_14_book_now": "Book Now",
  "text_15_ideal_for": "Ideal For",
  "text_16_additional_investment": "Additional Investment",
  "text_17_aed_100": "AED 100",
  "text_18_per_person": "per person",
  "text_19_added_to_the_standard_programm": "Added to the standard programme fee. Covers tutor travel time, transportation, and the convenience of on-site instruction.",
  "text_20_minimum_4_players_required": "Minimum 4 players required",
  "text_21_ideal_for": "Ideal For",
  "text_22_additional_investment": "Additional Investment",
  "text_23_aed_100": "AED 100",
  "text_24_per_person": "per person",
  "text_25_added_to_the_standard_programm": "Added to the standard programme or guided play fee. Provides greater flexibility, personalised attention, and the convenience of learning or playing at a time that works best for you and your group.",
  "text_26_minimum_4_players_required": "Minimum 4 players required",
  "text_27_option_02": "Option 02",
  "text_28_play_at_your_convenience": "Play at Your Convenience",
  "text_29_your_group_your_time_your_tabl": "Your Group. Your Time. Your Table.",
  "text_30_would_you_like_a_private_sessi": "Would you like a private session outside the regular Mahjong Success training and play schedule? Whether it's a private training session, guided game, family session, community gathering, or private play group, we can arrange a dedicated tutor and customised schedule to suit your needs.",
  "text_31_book_now": "Book Now",
  "text_32_get_started": "Get Started",
  "text_33_ready_to_bring_the_mahjong_suc": "Ready to bring the Mahjong Success experience to your preferred venue or time?",
  "text_34_reach_out_and_we_ll_design_a_p": "Reach out and we'll design a programme that works perfectly for your group.",
  "text_35_learn_anywhere_play_anywhere": "Learn Anywhere. Play Anywhere.",
  "text_36_succeed_anywhere": "Succeed Anywhere."
}
    }
  });

  console.log('Seeding faq...');
  
  // Ensure page exists
  const page_faq = await prisma.cmsPage.upsert({
    where: { slug: 'faq' },
    update: { title: 'faq' },
    create: { slug: 'faq', title: 'faq' },
  });

  await prisma.cmsSection.upsert({
    where: { pageId_key: { pageId: page_faq.id, key: 'faq_content' } },
    update: { content: {
  "text_0_we_welcome_students_aged_10_ye": "We welcome students aged 10 years and above. Our programmes are suitable for children, teenagers, university students, adults, seniors, families, community groups, and corporate teams.",
  "text_1_students_between_the_ages_of_1": "Students between the ages of 10 and 18, must be accompanied by a participating parent, guardian, or responsible adult. As a result, bookings for students in this age group are made on a minimum two-person basis, with both the student and accompanying adult participating together.",
  "text_2_each_level_includes": "Each level includes:",
  "text_3_1_hour_guided_play_session": "1 Hour Guided Play Session",
  "text_4__includes_2_guided_games_ideal": "— Includes 2 Guided Games. Ideal for players who have recently completed a training level and want to strengthen their understanding of the concepts and games taught.",
  "text_5_2_hours_guided_play_session": "2 Hours Guided Play Session",
  "text_6__includes_4_guided_games_ideal": "— Includes 4 Guided Games. Ideal for players who are comfortable with the concepts and want to build speed, improve strategy, gain more experience, and prepare for progression to the next level.",
  "text_7_yes_mahjong_success_offers_a_r": "Yes. Mahjong Success offers a range of Fast Track Packages and Bundles designed to provide greater value and help players progress through their Mahjong journey more efficiently.",
  "text_8_packages_are_available_at_diff": "Packages are available at different stages of the Mahjong Success pathway, including Foundation, Strategy, Advanced Hand Building, Partnership Play, Guided Games, and other specialised learning programmes.",
  "text_9_many_of_our_packages_include_s": "Many of our packages include special bundle pricing, allowing players to save compared to booking individual modules or sessions separately.",
  "text_10_for_more_information_please_vi": "For more information, please visit our Fast Track Packages page to explore the available bundles, pricing, and savings.",
  "text_11_yes_our_fast_track_packages_ar": "Yes. Our Fast Track Packages are designed to reward players who commit to their learning journey. Most packages include discounted bundle pricing, allowing participants to save compared to purchasing individual sessions or modules separately.",
  "text_12_please_visit_our_fast_track_pa": "Please visit our Fast Track Packages page for details of current package offers and savings.",
  "text_13_help_support": "Help & Support",
  "text_14_frequently_asked_questions": "Frequently Asked Questions",
  "text_15_everything_you_need_to_know_ab": "Everything you need to know about Mahjong Success — from learning Mahjong and choosing the right training level to guided games, community play, events, and corporate experiences.",
  "text_16_ready_to_start_your_journey": "Ready to Start Your Journey?",
  "text_17_whether_you_re_looking_to_lear": "Whether you're looking to learn Mahjong, improve your skills, join a community, organise an event, or create a customised programme, Mahjong Success provides the pathway, support, and expertise to help you succeed.",
  "text_18_master_mahjong_one_tile_at_a_t": "Master Mahjong One Tile at a Time."
} },
    create: {
      key: 'faq_content',
      name: 'Page Content',
      pageId: page_faq.id,
      content: {
  "text_0_we_welcome_students_aged_10_ye": "We welcome students aged 10 years and above. Our programmes are suitable for children, teenagers, university students, adults, seniors, families, community groups, and corporate teams.",
  "text_1_students_between_the_ages_of_1": "Students between the ages of 10 and 18, must be accompanied by a participating parent, guardian, or responsible adult. As a result, bookings for students in this age group are made on a minimum two-person basis, with both the student and accompanying adult participating together.",
  "text_2_each_level_includes": "Each level includes:",
  "text_3_1_hour_guided_play_session": "1 Hour Guided Play Session",
  "text_4__includes_2_guided_games_ideal": "— Includes 2 Guided Games. Ideal for players who have recently completed a training level and want to strengthen their understanding of the concepts and games taught.",
  "text_5_2_hours_guided_play_session": "2 Hours Guided Play Session",
  "text_6__includes_4_guided_games_ideal": "— Includes 4 Guided Games. Ideal for players who are comfortable with the concepts and want to build speed, improve strategy, gain more experience, and prepare for progression to the next level.",
  "text_7_yes_mahjong_success_offers_a_r": "Yes. Mahjong Success offers a range of Fast Track Packages and Bundles designed to provide greater value and help players progress through their Mahjong journey more efficiently.",
  "text_8_packages_are_available_at_diff": "Packages are available at different stages of the Mahjong Success pathway, including Foundation, Strategy, Advanced Hand Building, Partnership Play, Guided Games, and other specialised learning programmes.",
  "text_9_many_of_our_packages_include_s": "Many of our packages include special bundle pricing, allowing players to save compared to booking individual modules or sessions separately.",
  "text_10_for_more_information_please_vi": "For more information, please visit our Fast Track Packages page to explore the available bundles, pricing, and savings.",
  "text_11_yes_our_fast_track_packages_ar": "Yes. Our Fast Track Packages are designed to reward players who commit to their learning journey. Most packages include discounted bundle pricing, allowing participants to save compared to purchasing individual sessions or modules separately.",
  "text_12_please_visit_our_fast_track_pa": "Please visit our Fast Track Packages page for details of current package offers and savings.",
  "text_13_help_support": "Help & Support",
  "text_14_frequently_asked_questions": "Frequently Asked Questions",
  "text_15_everything_you_need_to_know_ab": "Everything you need to know about Mahjong Success — from learning Mahjong and choosing the right training level to guided games, community play, events, and corporate experiences.",
  "text_16_ready_to_start_your_journey": "Ready to Start Your Journey?",
  "text_17_whether_you_re_looking_to_lear": "Whether you're looking to learn Mahjong, improve your skills, join a community, organise an event, or create a customised programme, Mahjong Success provides the pathway, support, and expertise to help you succeed.",
  "text_18_master_mahjong_one_tile_at_a_t": "Master Mahjong One Tile at a Time."
}
    }
  });

  console.log('Seeding privacy-policy...');
  
  // Ensure page exists
  const page_privacy_policy = await prisma.cmsPage.upsert({
    where: { slug: 'privacy-policy' },
    update: { title: 'privacy policy' },
    create: { slug: 'privacy-policy', title: 'privacy policy' },
  });

  await prisma.cmsSection.upsert({
    where: { pageId_key: { pageId: page_privacy_policy.id, key: 'privacy-policy_content' } },
    update: { content: {
  "text_0_mahjong_success": "Mahjong Success",
  "text_1_privacy_policy": "Privacy Policy",
  "text_2_how_mahjong_success_collects_u": "How Mahjong Success collects, uses, and protects your personal data when you browse our site, contact us, or make a booking.",
  "text_3_privacy_summary": "Privacy Summary",
  "text_4_legal_pages": "Legal Pages",
  "text_5_overview": "Overview",
  "text_6_your_privacy_matters": "Your Privacy Matters",
  "text_7_mahjong_success_respects_your": "Mahjong Success respects your privacy and is committed to handling your information responsibly and transparently, and in accordance with applicable data protection requirements.",
  "text_8_photography_media": "Photography & Media",
  "text_9_photography_media": "Photography & Media",
  "text_10_from_time_to_time_photos_or_sh": "From time to time, photos or short videos may be taken during classes, events, or programmes for use on Mahjong Success's website, social media, or promotional materials. These are used thoughtfully to reflect the experience and community.",
  "text_11_if_you_prefer_not_to_be_photog": "If you prefer not to be photographed or recorded, simply let us know before the start of the programme or event — we will fully respect your preference.",
  "text_12_details": "Details",
  "text_13_privacy_details": "Privacy Details",
  "text_14_need_the_full_legal_overview": "Need the full legal overview?",
  "text_15_review_our_refund_policy_priva": "Review our Refund Policy, Privacy Policy, and Terms & Conditions before booking."
} },
    create: {
      key: 'privacy-policy_content',
      name: 'Page Content',
      pageId: page_privacy_policy.id,
      content: {
  "text_0_mahjong_success": "Mahjong Success",
  "text_1_privacy_policy": "Privacy Policy",
  "text_2_how_mahjong_success_collects_u": "How Mahjong Success collects, uses, and protects your personal data when you browse our site, contact us, or make a booking.",
  "text_3_privacy_summary": "Privacy Summary",
  "text_4_legal_pages": "Legal Pages",
  "text_5_overview": "Overview",
  "text_6_your_privacy_matters": "Your Privacy Matters",
  "text_7_mahjong_success_respects_your": "Mahjong Success respects your privacy and is committed to handling your information responsibly and transparently, and in accordance with applicable data protection requirements.",
  "text_8_photography_media": "Photography & Media",
  "text_9_photography_media": "Photography & Media",
  "text_10_from_time_to_time_photos_or_sh": "From time to time, photos or short videos may be taken during classes, events, or programmes for use on Mahjong Success's website, social media, or promotional materials. These are used thoughtfully to reflect the experience and community.",
  "text_11_if_you_prefer_not_to_be_photog": "If you prefer not to be photographed or recorded, simply let us know before the start of the programme or event — we will fully respect your preference.",
  "text_12_details": "Details",
  "text_13_privacy_details": "Privacy Details",
  "text_14_need_the_full_legal_overview": "Need the full legal overview?",
  "text_15_review_our_refund_policy_priva": "Review our Refund Policy, Privacy Policy, and Terms & Conditions before booking."
}
    }
  });

  console.log('Seeding refund-policy...');
  
  // Ensure page exists
  const page_refund_policy = await prisma.cmsPage.upsert({
    where: { slug: 'refund-policy' },
    update: { title: 'refund policy' },
    create: { slug: 'refund-policy', title: 'refund policy' },
  });

  await prisma.cmsSection.upsert({
    where: { pageId_key: { pageId: page_refund_policy.id, key: 'refund-policy_content' } },
    update: { content: {
  "text_0_mahjong_success_currently_acce": "Mahjong Success currently accepts payment exclusively via:",
  "text_1_cash_payments_bank_transfers_c": "Cash payments, bank transfers, cheques, and other payment methods are not accepted unless otherwise approved by Mahjong Success.",
  "text_2_payment_must_be_completed_at_t": "Payment must be completed at the time of booking unless alternative arrangements have been agreed in writing. Failure to complete payment may result in:",
  "text_3_special_arrangements_may_be_av": "Special arrangements may be available for:",
  "text_4_additional_terms_may_apply_and": "Additional terms may apply and will be communicated during the booking process.",
  "text_5_if_a_payment_is_declined_rejec": "If a payment is declined, rejected, or otherwise unsuccessful:",
  "text_6_as_trainer_and_venue_resources": "As trainer and venue resources are allocated in advance:",
  "text_7_due_to_venue_commitments_event": "Due to venue commitments, event preparation, and operational costs:",
  "text_8_corporate_workshops_team_build": "Corporate workshops, team-building activities, and customised programmes are planned specifically for each organisation:",
  "text_9_if_mahjong_success_cancels_pos": "If Mahjong Success cancels, postpones, or reschedules a programme due to insufficient registrations, trainer availability, venue issues, or circumstances beyond our control, participants may be offered one of the following:",
  "text_10_where_a_refund_is_approved": "Where a refund is approved:",
  "text_11_mahjong_success": "Mahjong Success",
  "text_12_refund_policy": "Refund Policy",
  "text_13_booking_with_mahjong_success_s": "Booking with Mahjong Success should feel seamless and low-risk. Our policy is structured to offer flexibility while respecting the commitment of every session.",
  "text_14_policy_summary": "Policy Summary",
  "text_15_legal_pages": "Legal Pages",
  "text_16_policy_overview": "Policy Overview",
  "text_17_refunds_cancellations_reschedu": "Refunds, Cancellations & Rescheduling",
  "text_18_our_policy_is_structured_to_of": "Our policy is structured to offer flexibility while respecting the time and resources invested in planning every session, event, and programme.",
  "text_19_please_note": "Please note:",
  "text_20_as_our_sessions_are_intentiona": "As our sessions are intentionally kept small, last-minute cancellations impact the experience for all participants. We appreciate your understanding in honouring your booking.",
  "text_21_payment_policy": "Payment Policy",
  "text_22_payment_terms": "Payment Terms",
  "text_23_applies_to_all_mahjong_success": "Applies to all Mahjong Success programmes, training sessions, guided games, events, and corporate experiences.",
  "text_24_refund_rescheduling_policy": "Refund & Rescheduling Policy",
  "text_25_refund_details": "Refund Details",
  "text_26_applies_to_all_mahjong_success": "Applies to all Mahjong Success programmes, training sessions, guided games, events, educational programmes, community activities, and corporate experiences.",
  "text_27_need_assistance": "Need Assistance?",
  "text_28_we_re_here_to_make_this_easy": "We're here to make this easy.",
  "text_29_for_refunds_rescheduling_or_an": "For refunds, rescheduling, or any booking queries, please get in touch.",
  "text_30_need_the_full_legal_overview": "Need the full legal overview?",
  "text_31_review_our_refund_policy_priva": "Review our Refund Policy, Privacy Policy, and Terms & Conditions before booking."
} },
    create: {
      key: 'refund-policy_content',
      name: 'Page Content',
      pageId: page_refund_policy.id,
      content: {
  "text_0_mahjong_success_currently_acce": "Mahjong Success currently accepts payment exclusively via:",
  "text_1_cash_payments_bank_transfers_c": "Cash payments, bank transfers, cheques, and other payment methods are not accepted unless otherwise approved by Mahjong Success.",
  "text_2_payment_must_be_completed_at_t": "Payment must be completed at the time of booking unless alternative arrangements have been agreed in writing. Failure to complete payment may result in:",
  "text_3_special_arrangements_may_be_av": "Special arrangements may be available for:",
  "text_4_additional_terms_may_apply_and": "Additional terms may apply and will be communicated during the booking process.",
  "text_5_if_a_payment_is_declined_rejec": "If a payment is declined, rejected, or otherwise unsuccessful:",
  "text_6_as_trainer_and_venue_resources": "As trainer and venue resources are allocated in advance:",
  "text_7_due_to_venue_commitments_event": "Due to venue commitments, event preparation, and operational costs:",
  "text_8_corporate_workshops_team_build": "Corporate workshops, team-building activities, and customised programmes are planned specifically for each organisation:",
  "text_9_if_mahjong_success_cancels_pos": "If Mahjong Success cancels, postpones, or reschedules a programme due to insufficient registrations, trainer availability, venue issues, or circumstances beyond our control, participants may be offered one of the following:",
  "text_10_where_a_refund_is_approved": "Where a refund is approved:",
  "text_11_mahjong_success": "Mahjong Success",
  "text_12_refund_policy": "Refund Policy",
  "text_13_booking_with_mahjong_success_s": "Booking with Mahjong Success should feel seamless and low-risk. Our policy is structured to offer flexibility while respecting the commitment of every session.",
  "text_14_policy_summary": "Policy Summary",
  "text_15_legal_pages": "Legal Pages",
  "text_16_policy_overview": "Policy Overview",
  "text_17_refunds_cancellations_reschedu": "Refunds, Cancellations & Rescheduling",
  "text_18_our_policy_is_structured_to_of": "Our policy is structured to offer flexibility while respecting the time and resources invested in planning every session, event, and programme.",
  "text_19_please_note": "Please note:",
  "text_20_as_our_sessions_are_intentiona": "As our sessions are intentionally kept small, last-minute cancellations impact the experience for all participants. We appreciate your understanding in honouring your booking.",
  "text_21_payment_policy": "Payment Policy",
  "text_22_payment_terms": "Payment Terms",
  "text_23_applies_to_all_mahjong_success": "Applies to all Mahjong Success programmes, training sessions, guided games, events, and corporate experiences.",
  "text_24_refund_rescheduling_policy": "Refund & Rescheduling Policy",
  "text_25_refund_details": "Refund Details",
  "text_26_applies_to_all_mahjong_success": "Applies to all Mahjong Success programmes, training sessions, guided games, events, educational programmes, community activities, and corporate experiences.",
  "text_27_need_assistance": "Need Assistance?",
  "text_28_we_re_here_to_make_this_easy": "We're here to make this easy.",
  "text_29_for_refunds_rescheduling_or_an": "For refunds, rescheduling, or any booking queries, please get in touch.",
  "text_30_need_the_full_legal_overview": "Need the full legal overview?",
  "text_31_review_our_refund_policy_priva": "Review our Refund Policy, Privacy Policy, and Terms & Conditions before booking."
}
    }
  });

  console.log('Seeding terms-and-conditions...');
  
  // Ensure page exists
  const page_terms_and_conditions = await prisma.cmsPage.upsert({
    where: { slug: 'terms-and-conditions' },
    update: { title: 'terms and conditions' },
    create: { slug: 'terms-and-conditions', title: 'terms and conditions' },
  });

  await prisma.cmsSection.upsert({
    where: { pageId_key: { pageId: page_terms_and_conditions.id, key: 'terms-and-conditions_content' } },
    update: { content: {
  "text_0_mahjong_success_offers_a_varie": "Mahjong Success offers a variety of programmes, including:",
  "text_1_programme_content_may_be_updat": "Programme content may be updated from time to time to improve learning outcomes and participant experience.",
  "text_2_all_participants_are_expected": "All participants are expected to conduct themselves respectfully and professionally. Participants must:",
  "text_3_mahjong_success_reserves_the_r": "Mahjong Success reserves the right to remove participants whose behaviour negatively affects the learning experience of others.",
  "text_4_mahjong_success": "Mahjong Success",
  "text_5_terms_conditions": "Terms & Conditions",
  "text_6_the_terms_governing_participat": "The terms governing participation, bookings, payments, conduct, and use of Mahjong Success programmes and services.",
  "text_7_terms_summary": "Terms Summary",
  "text_8_legal_pages": "Legal Pages",
  "text_9_terms": "Terms",
  "text_10_using_mahjong_success_services": "Using Mahjong Success Services",
  "text_11_by_registering_for_or_particip": "By registering for or participating in any Mahjong Success activity, you agree to these Terms & Conditions.",
  "text_12_full_terms": "Full Terms",
  "text_13_terms_in_detail": "Terms in Detail",
  "text_14_these_terms_conditions_govern": "These Terms & Conditions govern participation in all Mahjong Success programmes, training sessions, guided games, events, community activities, educational programmes, and corporate experiences.",
  "text_15_need_the_full_legal_overview": "Need the full legal overview?",
  "text_16_review_our_refund_policy_priva": "Review our Refund Policy, Privacy Policy, and Terms & Conditions before booking."
} },
    create: {
      key: 'terms-and-conditions_content',
      name: 'Page Content',
      pageId: page_terms_and_conditions.id,
      content: {
  "text_0_mahjong_success_offers_a_varie": "Mahjong Success offers a variety of programmes, including:",
  "text_1_programme_content_may_be_updat": "Programme content may be updated from time to time to improve learning outcomes and participant experience.",
  "text_2_all_participants_are_expected": "All participants are expected to conduct themselves respectfully and professionally. Participants must:",
  "text_3_mahjong_success_reserves_the_r": "Mahjong Success reserves the right to remove participants whose behaviour negatively affects the learning experience of others.",
  "text_4_mahjong_success": "Mahjong Success",
  "text_5_terms_conditions": "Terms & Conditions",
  "text_6_the_terms_governing_participat": "The terms governing participation, bookings, payments, conduct, and use of Mahjong Success programmes and services.",
  "text_7_terms_summary": "Terms Summary",
  "text_8_legal_pages": "Legal Pages",
  "text_9_terms": "Terms",
  "text_10_using_mahjong_success_services": "Using Mahjong Success Services",
  "text_11_by_registering_for_or_particip": "By registering for or participating in any Mahjong Success activity, you agree to these Terms & Conditions.",
  "text_12_full_terms": "Full Terms",
  "text_13_terms_in_detail": "Terms in Detail",
  "text_14_these_terms_conditions_govern": "These Terms & Conditions govern participation in all Mahjong Success programmes, training sessions, guided games, events, community activities, educational programmes, and corporate experiences.",
  "text_15_need_the_full_legal_overview": "Need the full legal overview?",
  "text_16_review_our_refund_policy_priva": "Review our Refund Policy, Privacy Policy, and Terms & Conditions before booking."
}
    }
  });

  console.log('Seeding contact...');
  
  // Ensure page exists
  const page_contact = await prisma.cmsPage.upsert({
    where: { slug: 'contact' },
    update: { title: 'contact' },
    create: { slug: 'contact', title: 'contact' },
  });

  await prisma.cmsSection.upsert({
    where: { pageId_key: { pageId: page_contact.id, key: 'contact_content' } },
    update: { content: {
  "text_0_get_in_touch": "Get in Touch",
  "text_1_contact_us": "Contact Us",
  "text_2_we_re_here_to_help_with_any_en": "We're here to help with any enquiry.",
  "text_3_message_sent": "Message Sent!",
  "text_4_your_email_client_has_been_ope": "Your email client has been opened with your message pre-filled. A member of the Mahjong Success team will be in touch shortly.",
  "text_5_learn_play_succeed": "Learn. Play. Succeed.",
  "text_6_back_to_home": "Back to Home",
  "text_7_send_another": "Send Another",
  "text_8_how_can_we_assist_you": "How Can We Assist You?",
  "text_9_whether_you_re_looking_to_lear": "Whether you're looking to learn Mahjong, join a social event, organise a corporate session, explore our programmes, or simply learn more about Mahjong Success, we're happy to assist.",
  "text_10_before_contacting_us_we_recomm": "Before contacting us, we recommend visiting our",
  "text_11_frequently_asked_questions_faq": "Frequently Asked Questions (FAQs) page",
  "text_12__many_of_the_questions_we_rece": ". Many of the questions we receive are already answered there.",
  "text_13_if_your_question_isn_t_covered": "If your question isn't covered, please feel free to get in touch. Simply select the subject that best matches your enquiry and send us your message.",
  "text_14_we_look_forward_to_hearing_fro": "We look forward to hearing from you and helping you on your Mahjong journey.",
  "text_15_info_mahjongsuccess_com": "info@mahjongsuccess.com",
  "text_16_learn_play_succeed": "Learn. Play. Succeed.",
  "text_17_send_us_a_message": "Send Us a Message",
  "text_18_your_enquiry": "Your Enquiry",
  "text_19_select_a_subject": "Select a subject…",
  "text_20_send_message": "Send Message"
} },
    create: {
      key: 'contact_content',
      name: 'Page Content',
      pageId: page_contact.id,
      content: {
  "text_0_get_in_touch": "Get in Touch",
  "text_1_contact_us": "Contact Us",
  "text_2_we_re_here_to_help_with_any_en": "We're here to help with any enquiry.",
  "text_3_message_sent": "Message Sent!",
  "text_4_your_email_client_has_been_ope": "Your email client has been opened with your message pre-filled. A member of the Mahjong Success team will be in touch shortly.",
  "text_5_learn_play_succeed": "Learn. Play. Succeed.",
  "text_6_back_to_home": "Back to Home",
  "text_7_send_another": "Send Another",
  "text_8_how_can_we_assist_you": "How Can We Assist You?",
  "text_9_whether_you_re_looking_to_lear": "Whether you're looking to learn Mahjong, join a social event, organise a corporate session, explore our programmes, or simply learn more about Mahjong Success, we're happy to assist.",
  "text_10_before_contacting_us_we_recomm": "Before contacting us, we recommend visiting our",
  "text_11_frequently_asked_questions_faq": "Frequently Asked Questions (FAQs) page",
  "text_12__many_of_the_questions_we_rece": ". Many of the questions we receive are already answered there.",
  "text_13_if_your_question_isn_t_covered": "If your question isn't covered, please feel free to get in touch. Simply select the subject that best matches your enquiry and send us your message.",
  "text_14_we_look_forward_to_hearing_fro": "We look forward to hearing from you and helping you on your Mahjong journey.",
  "text_15_info_mahjongsuccess_com": "info@mahjongsuccess.com",
  "text_16_learn_play_succeed": "Learn. Play. Succeed.",
  "text_17_send_us_a_message": "Send Us a Message",
  "text_18_your_enquiry": "Your Enquiry",
  "text_19_select_a_subject": "Select a subject…",
  "text_20_send_message": "Send Message"
}
    }
  });

  console.log('Seeding points-calculator...');
  const page_points_calculator = await prisma.cmsPage.upsert({
    where: { slug: 'points-calculator' },
    update: { title: 'points calculator' },
    create: { slug: 'points-calculator', title: 'points calculator' },
  });

  await prisma.cmsSection.upsert({
    where: { pageId_key: { pageId: page_points_calculator.id, key: 'points-calculator_content' } },
    update: { content: {
      "text_0_taiwanese_mahjong": "Taiwanese Mahjong",
      "text_1_points_calculator": "Points Calculator",
      "text_2_score_with_confidence_play_wit": "Score with Confidence. Play with Precision.",
      "text_3_calculate_your_taiwanese_mahjo": "Calculate your Taiwanese Mahjong score instantly. Select your combinations and let the calculator do the math for you."
    } },
    create: {
      key: 'points-calculator_content',
      name: 'Page Content',
      pageId: page_points_calculator.id,
      content: {
        "text_0_taiwanese_mahjong": "Taiwanese Mahjong",
        "text_1_points_calculator": "Points Calculator",
        "text_2_score_with_confidence_play_wit": "Score with Confidence. Play with Precision.",
        "text_3_calculate_your_taiwanese_mahjo": "Calculate your Taiwanese Mahjong score instantly. Select your combinations and let the calculator do the math for you."
      }
    }
  });
}
