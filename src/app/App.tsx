import { useState } from 'react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { Button } from './components/ui/button';
import { AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useScrollProgress } from './components/useScrollProgress';
import { ChatWidget } from './components/ChatWidget';

// Product images
const productImage = 'https://experthealthadvice.com/detox-tea/landers/84af3a0742/bvbp-AU-teafox-919.51-ob/files/13838.png.jpeg';
const guaranteeBadge = 'https://experthealthadvice.com/detox-tea/landers/84af3a0742/bvbp-AU-teafox-919.51-ob/files/100-guarantee-seal-1_2.png';

export default function App() {
  const [showAllComments, setShowAllComments] = useState(false);
  const [likedComments, setLikedComments] = useState<Set<number>>(new Set());
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');
  const scrollProgress = useScrollProgress();

  const comments = [
    { 
      name: "Tohloria Lewis", 
      text: "I have been using this blood vessel detox tea for 3 weeks now, and I've already noticed a significant improvement in my circulation and lower blood pressure! Thank you so much for sharing this!", 
      likes: 13, 
      time: "12 minutes ago",
      avatar: "https://experthealthadvice.com/detox-tea/landers/84af3a0742/bvbp-AU-teafox-919.51-ob/files/lewis.jpg" // 👈 Replace with your image URL
    },
    { 
      name: "Tanya Porquez", 
      text: "I've been using the product for about 6 wks. Honestly, this is unbelievable, all I have to say is WOW.", 
      likes: 6, 
      time: "13 minutes ago",
      avatar: "https://experthealthadvice.com/detox-tea/landers/84af3a0742/bvbp-AU-teafox-919.51-ob/files/tanya.jpg" // 👈 Replace with your image URL
    },
    { 
      name: "Jennifer Jackson Mercer", 
      text: "A friend of mine used and recommended it to me 3 weeks ago. I ordered the product and received it within 3 days. The results have been incredible and I can't wait to see what weeks 3 and 4 bring.", 
      likes: 19, 
      time: "25 minutes ago",
      avatar: "https://experthealthadvice.com/detox-tea/landers/84af3a0742/bvbp-AU-teafox-919.51-ob/files/jenni.jpg" // 👈 Replace with your image URL
    },
    { 
      name: "Kristy Cash", 
      text: "I wish I knew about this product before I tried expensive cardiovascular treatments! It would have saved a lot of money and improved my blood vessel health naturally!", 
      likes: 0, 
      time: "46 minutes ago",
      avatar: "https://i.pravatar.cc/150?img=10" // 👈 Replace with your image URL
    },
    { 
      name: "Katy Barrott", 
      text: "I can't believe this is really amazing! I am very much pleased after using this product.", 
      likes: 43, 
      time: "about an hour ago",
      avatar: "https://experthealthadvice.com/detox-tea/landers/84af3a0742/bvbp-AU-teafox-919.51-ob/files/cash.jpg" // 👈 Replace with your image URL
    },
    { 
      name: "Julie Keyse", 
      text: "probably I'm a bit more overweight than most of you folks. but Lulutox worked for me too! LOL! I can't say anything more exciting. Thanks for the inspiration!", 
      likes: 0, 
      time: "2 hours ago",
      avatar: "https://experthealthadvice.com/detox-tea/landers/84af3a0742/bvbp-AU-teafox-919.51-ob/files/julie.jpg" // 👈 Replace with your image URL
    },
    { 
      name: "Sarah Williams", 
      text: "My sister did this a few months ago, I waited to order my tea to see if it really worked and then they stopped giving out the big discount! what a dumb move that turned out to be. glad to see the promotion is back again, I wont make the same mistake.", 
      likes: 12, 
      time: "2 hours ago",
      avatar: "https://experthealthadvice.com/detox-tea/landers/84af3a0742/bvbp-AU-teafox-919.51-ob/files/sarah.jpg" // 👈 Replace with your image URL
    },
    { 
      name: "Kirsten Bauman Riley", 
      text: "I'm going to give this product a chance to work its magic on me. I've tried everything out there and so far nothing has been good enough to help me.", 
      likes: 30, 
      time: "2 hours ago",
      avatar: "https://experthealthadvice.com/detox-tea/landers/84af3a0742/bvbp-AU-teafox-919.51-ob/files/kirs.jpg" // 👈 Replace with your image URL
    },
    { 
      name: "Celia Kilgard", 
      text: "worked for me! It worked just like I thought it would. It was easy enough and I just want others to know when something works.", 
      likes: 53, 
      time: "2 hours ago",
      avatar: "https://experthealthadvice.com/detox-tea/landers/84af3a0742/bvbp-AU-teafox-919.51-ob/files/celia.jpg" // 👈 Replace with your image URL
    },
    { 
      name: "Alanna 'martin' Payne", 
      text: "Thanks for the info, just started mine.", 
      likes: 16, 
      time: "2 hours ago",
      avatar: "https://experthealthadvice.com/detox-tea/landers/84af3a0742/bvbp-AU-teafox-919.51-ob/files/alanna.jpg" // 👈 Replace with your image URL
    },
    { 
      name: "Alice Chang", 
      text: "Been so busy with the kids lately that I'm never able to find deals like this. I'll give it a shot!", 
      likes: 2, 
      time: "2 hours ago",
      avatar: "https://experthealthadvice.com/detox-tea/landers/84af3a0742/bvbp-AU-teafox-919.51-ob/files/alice.jpg" // 👈 Replace with your image URL
    },
    { 
      name: "Mark Fadlevich", 
      text: "Always impressed with the deals you guys dig up, got my tea. Can't wait to see what you've got lined up next week.", 
      likes: 11, 
      time: "2 hours ago",
      avatar: "https://experthealthadvice.com/detox-tea/landers/84af3a0742/bvbp-AU-teafox-919.51-ob/files/mark.jpg" // 👈 Replace with your image URL
    },
    { 
      name: "Ashley O'Brien Berlin", 
      text: "Yes, this stuff is amazing! My best friend Gina uses it, and I've been struggling for years with high blood pressure and poor circulation. You made me realize I could finally improve my cardiovascular health, which is so important for staying energetic and feeling my best for my daughter's wedding. I just ordered my first tea, and I have a very good feeling about it!", 
      likes: 33, 
      time: "2 hours ago",
      avatar: "https://experthealthadvice.com/detox-tea/landers/84af3a0742/bvbp-AU-teafox-919.51-ob/files/ashley.jpg" // 👈 Replace with your image URL
    },
    { 
      name: "Amanda Hickam", 
      text: "Hey Christine, i just placed my order. I can't wait to get my Lulutox!! Thanks, Aimee xoxoxo.", 
      likes: 23, 
      time: "3 hours ago",
      avatar: "https://experthealthadvice.com/detox-tea/landers/84af3a0742/bvbp-AU-teafox-919.51-ob/files/hick.jpg" // 👈 Replace with your image URL
    },
    { 
      name: "Brittany Jackson", 
      text: "My mom just e-mailed me this, a friend at work had told her about it. i guess it works really well", 
      likes: 6, 
      time: "3 hours ago",
      avatar: "https://experthealthadvice.com/detox-tea/landers/84af3a0742/bvbp-AU-teafox-919.51-ob/files/brit.jpg" // 👈 Replace with your image URL
    },
    { 
      name: "Shellie Wilson Hodge", 
      text: "Telling all my friends about this, thanx for the info", 
      likes: 2, 
      time: "3 hours ago",
      avatar: "https://experthealthadvice.com/detox-tea/landers/84af3a0742/bvbp-AU-teafox-919.51-ob/files/shel.jpg" // 👈 Replace with your image URL
    },
    { 
      name: "Jill Phongsa", 
      text: "wasn't sure about ordering online but this deal seals it for me, didn't want to miss out. checked out the pages and all is encrypted and good. looking forward to my new looks", 
      likes: 17, 
      time: "4 hours ago",
      avatar: "https://experthealthadvice.com/detox-tea/landers/84af3a0742/bvbp-AU-teafox-919.51-ob/files/jill.jpg" // 👈 Replace with your image URL
    },
    { 
      name: "Molly Murley Davis", 
      text: "I've gone ahead and ordered my tea. I can't wait to get started and see what happens.", 
      likes: 8, 
      time: "6 hours ago",
      avatar: "https://i.pravatar.cc/150?img=48" // 👈 Replace with your image URL
    },
    { 
      name: "Jenna Ponchot Bush", 
      text: "As a realtor it's important to look and feel my best, unfortunately the housing market isn't doing that great so cash has been a little tight lately. Thanks for the info, looking forward to receiving my tea.", 
      likes: 20, 
      time: "8 hours ago",
      avatar: "https://experthealthadvice.com/detox-tea/landers/84af3a0742/bvbp-AU-teafox-919.51-ob/files/jenna.jpg" // 👈 Replace with your image URL
    },
    { 
      name: "Laura Kelch Miranda", 
      text: "I have tried so much of this kind of stuff, in one sense I want to try it but in the back of my mind I am thinking, yeah right!! Someone please reassure me it works.", 
      likes: 10, 
      time: "8 hours ago",
      avatar: "https://experthealthadvice.com/detox-tea/landers/84af3a0742/bvbp-AU-teafox-919.51-ob/files/laura.jpg" // 👈 Replace with your image URL
    },
    { 
      name: "Sara Bergheger", 
      text: "I tried the tea thing a while ago and it worked pretty good.", 
      likes: 13, 
      time: "8 hours ago",
      avatar: "https://experthealthadvice.com/detox-tea/landers/84af3a0742/bvbp-AU-teafox-919.51-ob/files/sara.jpg" // 👈 Replace with your image URL
    },
    { 
      name: "Lauren Kirschenbaum Silver", 
      text: "For once I was able to do something nice for myself without feeling guilty about the cost.", 
      likes: 3, 
      time: "8 hours ago",
      avatar: "https://experthealthadvice.com/detox-tea/landers/84af3a0742/bvbp-AU-teafox-919.51-ob/files/silver.jpg" // 👈 Replace with your image URL
    },
    { 
      name: "Gotmy Mindframe Right", 
      text: "Had no idea you could get results like this.", 
      likes: 5, 
      time: "9 hours ago",
      avatar: "https://experthealthadvice.com/detox-tea/landers/84af3a0742/bvbp-AU-teafox-919.51-ob/files/got.jpg" // 👈 Replace with your image URL
    },
  ];

  const displayedComments = showAllComments ? comments : comments.slice(0, 8);

  const toggleLike = (index: number) => {
    setLikedComments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const handleReply = (index: number) => {
    setReplyingTo(index);
    setReplyText('');
  };

  const submitReply = (index: number) => {
    if (replyText.trim()) {
      // In a real app, this would post to your backend
      alert(`Reply posted to ${comments[index].name}: "${replyText}"`);
      setReplyText('');
      setReplyingTo(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#003366] text-white py-3 px-4 border-b-4 border-red-600">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <span className="text-2xl font-bold tracking-wider">HEALTH</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-sm px-3 py-1 hover:underline">Login</button>
            <button className="text-sm px-4 py-1.5 bg-red-600 hover:bg-red-700 rounded">
              WATCH TV
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Article */}
          <article className="lg:col-span-2 bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-[2.75rem] leading-[1.15] font-bold text-gray-900 mb-3">
              One Cup Every Night - For Unclog Blood Vessel, Lower Blood Pressure (It's Surprising!)
            </h1>
            
            <div className="text-sm text-gray-600 mb-6">
              <p><strong>(Published Saturday, February 21, 2026)</strong></p>
              <p className="mt-1">Sponsored | Health & Wellness Correspondent</p>
            </div>

            {/* Hero Image */}
            <div className="mb-8">
              <ImageWithFallback
                src="https://experthealthadvice.com/detox-tea/landers/84af3a0742/bvbp-AU-teafox-919.51-ob/files/pressurerbbd16.webp"
                alt="Blood pressure monitoring"
                className="w-full h-auto rounded"
              />
            </div>

            {/* Introduction */}
            <div className="prose max-w-none mb-8">
              <p className="text-lg leading-relaxed mb-4">
                <span className="text-5xl float-left mr-3 leading-none font-serif">H</span>
                igh blood pressure is now linked to nearly one in six deaths in the Australia. It's one of the leading causes of preventable deaths, especially among Australian over 40 - a group already facing age-related changes in blood vessels and slower circulation. Those struggling with obesity are even more vulnerable. But despite what most people think, high blood pressure doesn't actually begin with the heart - it starts inside the blood vessels.
              </p>

              <p className="mb-4">
                Over time, blood vessels become contaminated from the inside. Cholesterol, sticky plaque, and microscopic clots gradually settle along the vessel walls. What was once a smooth, flexible pathway for blood slowly turns narrow, stiff, and inflamed - making it increasingly difficult for blood to flow freely.
              </p>

              <p className="mb-4">
                Many doctors describe cholesterol in technical terms, but the reality is simple. Imagine cold grease left in a pan overnight. That thick, sticky residue is exactly how cholesterol behaves inside your arteries. It begins forming as early as your 20s, accelerates through your 30s, and by the time many Australian reach 40, the inner diameter of their blood vessels may already be reduced by nearly half.
              </p>

              <p className="mb-4">
                As circulation becomes restricted, the body has no choice but to compensate. The heart is forced to pump harder and harder just to push blood through these partially blocked vessels. That rising pressure inside your arteries is what doctors diagnose as high blood pressure. For adults over 40, these pressure surges often trigger headaches, dizziness, blurred vision, and extreme fatigue - warning signs that are frequently ignored.
              </p>
            </div>

            {/* Blood Vessel Image */}
            <div className="mb-8">
              <ImageWithFallback
                src="https://experthealthadvice.com/detox-tea/landers/84af3a0742/bvbp-AU-teafox-919.51-ob/files/50lbs0002222.jpg"
                alt="Arterial health visualization"
                className="w-full h-auto rounded"
              />
            </div>

            <div className="prose max-w-none mb-8">
              <h3 className="text-2xl font-bold mb-4">But cholesterol is not the only substance silently polluting your blood vessels.</h3>
              
              <p className="mb-4">
                Blood clots - known medically as thrombus masses - are even more dangerous. While cholesterol resembles fat, blood clots resemble thick curdled material that forms along damaged vessel walls. These clots can detach without warning and travel directly to the heart or brain, causing a heart attack or stroke. This is precisely why stroke risk rises sharply after age 40 and why older adults so often collapse without prior notice.
              </p>

              <p className="mb-4">
                Then there are calcium crystals and heavy-metal deposits. Over decades, exposure to environmental toxins, chemicals, and pollutants causes these microscopic crystals to accumulate inside blood vessels. They harden arterial walls, disrupt blood flow, and have been strongly associated with abnormal cell behavior and chronic disease. In many cases, they are found in extremely high concentrations in people suffering from advanced cardiovascular conditions.
              </p>

              <p className="mb-4">
                Clogged blood vessels are not just a silent threat - they are one of the most dangerous and deadly conditions affecting Australian today, especially those over 40 or living with obesity. When blockages worsen, blood supply to vital organs - particularly the brain - can suddenly be cut off, leading to stroke, organ failure, or sudden collapse.
              </p>

              <p className="mb-4">
                In fact, nearly 1 in 3 suffer from high blood pressure, with a disproportionate impact on adults over 40. If left unchecked, high blood pressure remains a leading cause of heart disease, kidney damage, cognitive decline, and strokes.
              </p>
            </div>

      <div className="mb-8">
              <ImageWithFallback
                src="https://experthealthadvice.com/detox-tea/landers/84af3a0742/bvbp-AU-teafox-919.51-ob/files/50lbs2222.jpg"
                alt="Arterial health visualization"
                className="w-full h-auto rounded"
              />
            </div>
            
            
            {/* Warning Signs Section */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
              <div className="flex items-start">
                <AlertCircle className="text-yellow-600 mr-3 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h3 className="text-xl font-bold mb-3">High blood pressure is often the very first warning sign</h3>
                  <p className="mb-4">
                    High blood pressure is often the very first warning sign that your blood vessels are already in serious trouble. Sudden pressure spikes usually mean your arteries are more than halfway blocked. For Australian over 40, even occasional headaches, shortness of breath, or lightheadedness can signal dangerously compromised circulation.
                  </p>
                  <p className="mb-4">
                    The most dangerous part? Blood vessel damage develops silently. Many people feel "mostly fine" until the day a stroke, heart attack, or sudden collapse occurs. By the time blood pressure numbers rise consistently, the underlying damage has often been progressing for years.
                  </p>
                  <p>
                    So how can you tell if your health is already at risk? Persistent headaches, blurred vision, dizziness, chest tightness, or unexplained fatigue are not signs of aging - they may be early warnings that your blood vessels are clogged and struggling to keep your organs alive.
                  </p>
                </div>
              </div>
            </div>

            <p className="mb-6">
              This is why many experts now believe that preventing serious cardiovascular events doesn't lie solely in medication - but in restoring and protecting blood vessel health itself. Recent research has brought renewed attention to an ancient, long-forgotten herbal solution that was traditionally used to support circulation, help clear internal buildup, and promote balanced blood pressure naturally.
            </p>

            <h2 className="text-3xl font-bold mb-6 mt-10">Here are 7 warning signs you should never ignore. They indicate that your blood vessels are no longer functioning properly, and your body is bearing the consequences.</h2>



            <div className="mb-8">
                    <ImageWithFallback
                      src="https://experthealthadvice.com/detox-tea/landers/84af3a0742/bvbp-AU-teafox-919.51-ob/files/blood_pressure_bigbead_alt.webp"
                      alt="Arterial health visualization"
                      className="w-full h-auto rounded"
                    />
                  </div>



            {/* Warning Signs List */}
            <div className="space-y-6 mb-10">
              <div>
                <h4 className="text-xl font-bold mb-2">1. SWOLLEN FEET, HANDS, OR FACE</h4>
                <p>When blood vessels become clogged and circulation slows down, excess fluid can no longer be efficiently removed. By evening, your ankles might swell to the point that sock marks are visible. Your face may become puffy, with noticeable bags under the eyes. Rings become difficult to remove, and even the abdomen can appear larger - not from fat, but from fluid buildup as internal organs begin to swell.</p>
              </div>

              <div>
                <h4 className="text-xl font-bold mb-2">2. DIZZINESS OR POOR BALANCE</h4>
                <p>Proper balance relies on steady blood flow to the inner ear and brain. When blood vessels narrow and reduce oxygen supply, the vestibular system becomes compromised, leading to dizziness, unsteadiness, and sometimes even hearing issues.</p>
              </div>

              <div>
                <h4 className="text-xl font-bold mb-2">3. NOISE OR RINGING IN THE EARS</h4>
                <p>Ringing, buzzing, or pulsating sounds are often the result of blood struggling to pass through narrowed blood vessels. These sounds can be constant or intermittent, making it difficult to concentrate. It's one of the clearest signs that circulation is compromised.</p>
              </div>

              <div>
                <h4 className="text-xl font-bold mb-2">4. INSOMNIA AND POOR SLEEP</h4>
                <p>The brain relies on healthy blood flow to produce melatonin - the hormone that regulates sleep and recovery. When circulation is impaired, you may feel exhausted but still unable to fall asleep. Over time, this sleep disruption affects hormonal balance, metabolism, and overall health.</p>
              </div>

              <div>
                <h4 className="text-xl font-bold mb-2">5. RAPID FATIGUE AND MORNING EXHAUSTION</h4>
                <p>When organs don't get enough oxygen and nutrients, the body switches into survival mode, conserving energy just to keep essential systems running. As a result, even simple tasks - both mental and physical - feel incredibly tiring.</p>
              </div>

              <div>
                <h4 className="text-xl font-bold mb-2">6. BLURRED VISION OR SEEING STARS</h4>
                <p>The eyes are highly sensitive to reduced blood supply. Visual disturbances like flashing lights, blurry vision, or seeing "stars" often indicate that small blood vessels supplying the eyes have already been compromised.</p>
              </div>

              <div>
                <h4 className="text-xl font-bold mb-2">7. ACHING OR STIFF JOINTS</h4>
                <p>Healthy joints depend on proper blood circulation to deliver nutrients and maintain synovial fluid. When blood flow is restricted, joints become stiff, painful, and sensitive to weather changes. Cracking sounds and morning stiffness are common symptoms.</p>
              </div>
            </div>

            <div className="bg-gray-100 p-6 rounded mb-10">
              <p className="text-lg mb-3">
                Most people experience several of these symptoms simultaneously. The biggest mistake is treating them as separate issues.
              </p>
              <p className="text-lg font-semibold">
                If blood vessels remain clogged, blood pressure will stay high. Real relief begins only when circulation improves and blood vessels are allowed to open and relax again.
              </p>
            </div>


            <div className="mb-8">
                    <ImageWithFallback
                      src="https://experthealthadvice.com/detox-tea/landers/84af3a0742/bvbp-AU-teafox-919.51-ob/files/50lbs.jpg"
                      alt="Arterial health visualization"
                      className="w-full h-auto rounded"
                    />
                  </div>



            {/* Breakthrough Discovery */}
            <h2 className="text-3xl font-bold mb-6 mt-12">Breakthrough Discovery: How a Long-Forgotten Herbal Tea Helps Unclog Blood Vessels and Support Healthy Blood Pressure</h2>


            <div className="prose max-w-none mb-8">
              <p className="mb-4">
                For centuries, Benedictine monks have quietly relied on herbal teas to maintain clear blood vessels and strong cardiovascular health. Long before modern medicine existed, they understood a simple truth: when blood flows freely, the heart doesn't have to strain.
              </p>

              <p className="mb-4">
                What makes this so remarkable is the monks' unique lifestyle. They spend most of their days sitting, praying, reading, and studying, without intense exercise routines or the "heart-healthy" diets we are taught to follow today.
              </p>

              <p className="mb-4">
                Yet, despite their sedentary lifestyle, medical records show something extraordinary: their arteries remain flexible and unobstructed. Their blood pressure stays within a healthy range well into their 80s and even 90s. Many remain mentally sharp, physically steady, and full of energy - while most people struggle with fatigue, chronic health issues, and high blood pressure as they age.
              </p>

              <p className="mb-4">
                Their secret? It was never a pill or treatment. It was a daily ritual: a carefully prepared herbal tea made from 11 specific plants, each chosen for its ability to naturally support vascular health, break down cholesterol buildup, and encourage smooth, unrestricted blood flow.
              </p>

              <p className="mb-4">
                As these herbs work together, blood vessels gradually regain their natural elasticity. The heart no longer has to work overtime to pump blood through restricted arteries. This process helps maintain healthy blood pressure - naturally, without shocking the body.
              </p>
            </div>

            {/* Monk Testimonial */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-10 italic">
              <p className="mb-4">
                "For centuries, we've known that the body has an incredible ability to regulate and restore itself - but only when it's given the proper support.
              </p>
              <p className="mb-4">
                These herbs were chosen because they help cleanse blood vessels and allow blood to move freely again. When circulation improves, pressure inside the arteries naturally eases.
              </p>
              <p className="mb-4">
                Better blood flow to the brain delivers more oxygen and nutrients, supporting clearer thinking, stronger memory, and sharper focus throughout the day."
              </p>
              <p className="font-semibold not-italic">- Brother Thomas, Benedictine monk, age 82</p>
            </div>

            {/* The Science Behind the Formula */}
            <h2 className="text-3xl font-bold mb-6 mt-12">The Science Behind the Formula</h2>

            <div className="mb-8">
              <ImageWithFallback
                src="https://experthealthadvice.com/detox-tea/landers/84af3a0742/bvbp-AU-teafox-919.51-ob/files/4a5576a14732c71f6b4445c55ec2522b.png.jpeg"
                alt="Green tea and herbs"
                className="w-full h-auto rounded"
              />
            </div>

            <div className="prose max-w-none mb-8">
              <p className="mb-4">
                Intrigued by the monks' unusual cardiovascular health, a team of researchers set out to understand why this ancient tea worked so well. Over the course of a year, scientists carefully studied each individual herb and how they interact together.
              </p>

              <p className="mb-6">
                The result was a precisely balanced herbal blend now known as <strong>Lulutox</strong> - designed to support vascular cleansing, improve circulation, and help reduce unnecessary pressure on the heart.
              </p>

              <p className="mb-4">
                Each of the 11 herbs plays a specific role in supporting the body's natural detoxification and cardiovascular processes:
              </p>

              <div className="space-y-4 mb-8">
                <div>
                  <strong>Matcha Green Tea</strong> - Rich in powerful antioxidants and amino acids that support healthy blood flow, protect vessel walls from oxidative stress, and help maintain metabolic balance.
                </div>
                <div>
                  <strong>Yerba Mate</strong> - Supports circulation and natural energy production while helping blood move more efficiently through the vessels - without the sharp spikes associated with coffee.
                </div>
                <div>
                  <strong>Sencha Green Tea</strong> - Contains polyphenols that help combat inflammation and oxidative damage, supporting smoother, more flexible blood vessels.
                </div>
                <div>
                  <strong>Oolong Tea</strong> - Traditionally used to promote relaxation and balance, while providing essential minerals that support vascular tone and overall cardiovascular function.
                </div>
                <div>
                  <strong>Goji Berries</strong> - A natural source of iron and antioxidants that help improve oxygen delivery in the blood and support sustained circulation throughout the body.
                </div>
                <div>
                  <strong>Milk Thistle</strong> - Rich in silymarin, known for supporting detoxification processes that help reduce the burden of unwanted buildup affecting blood vessels.
                </div>
                <div>
                  <strong>Ginseng</strong> - Helps the body adapt to stress, supports healthy circulation, and has been traditionally used to assist in maintaining balanced blood pressure levels.
                </div>
                <div>
                  <strong>Lemongrass</strong> - Supports digestion and fluid balance, which indirectly helps reduce unnecessary pressure within the circulatory system.
                </div>
                <div>
                  <strong>Nettle Leaf</strong> - Valued for its anti-inflammatory properties, helping blood vessels remain calm, responsive, and less constricted.
                </div>
                <div>
                  <strong>Dandelion Leaf</strong> - Naturally supports fluid regulation and vascular health, helping the body eliminate excess buildup that can increase circulatory pressure.
                </div>
                <div>
                  <strong>Guarana</strong> - Provides gentle, sustained stimulation to support alertness and circulation, helping maintain consistent blood flow without overstressing the heart.
                </div>
              </div>

              <p className="mb-4">
                When combined, these herbs don't work in isolation. They support one another to help clear the pathways blood travels through. As resistance inside the vessels decreases, circulation improves - and pressure on the arterial walls can naturally begin to ease.
              </p>
            </div>
            
            <div className="mb-8">
              <ImageWithFallback
                src="https://experthealthadvice.com/detox-tea/landers/84af3a0742/bvbp-AU-teafox-919.51-ob/files/sgu3.jpg"
                alt="Green tea and herbs"
                className="w-full h-auto rounded"
              />
            </div>

            {/* Synergistic Effect */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-lg mb-10">
              <h3 className="text-2xl font-bold mb-4">The Synergistic Effect</h3>
              <p className="mb-4">
                But here's where it becomes truly remarkable. When combined, these herbs create what researchers describe as a synergistic effect - meaning they reinforce one another and work together to deliver results that no single herb could achieve on its own.
              </p>
              <p>
                Instead of targeting just one symptom, this herbal blend supports the entire circulatory system, helping blood vessels relax, improving flow efficiency, and reducing internal resistance. As circulation improves, the heart no longer needs to pump against constant pressure. This is why supporting clear blood vessels can naturally help lower blood pressure - a key factor in preventing strokes and heart disease, especially for those who are overweight or elderly.
              </p>
            </div>

            {/* Clinical Results */}
            <h3 className="text-2xl font-bold mb-4">Clinical Observation Results:</h3>
            <div className="bg-white border-2 border-green-500 rounded-lg p-6 mb-10">
              <p className="mb-4">
                In a 12-week observational study involving 147 participants, those who drank this herbal blend daily reported significant cardiovascular improvements - without changing their diet or exercise routine.
              </p>
              <ul className="space-y-3 mb-4">
                <li className="flex items-start">
                  <span className="text-green-600 mr-3 text-2xl">✓</span>
                  <span><strong>84%</strong> reported more stable and lower blood pressure readings</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3 text-2xl">✓</span>
                  <span><strong>82%</strong> noticed clearer thinking and reduced brain fog</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-3 text-2xl">✓</span>
                  <span><strong>95%</strong> experienced visible changes in body composition and fluid retention as circulation improved</span>
                </li>
              </ul>
              <p>
                These results suggest that when blood vessels are no longer clogged, the body can finally regulate pressure, energy, and metabolism more efficiently - just as it was designed to do. With better circulation, the body can more effectively manage weight, energy levels, and overall health, which is crucial for the millions of Australian struggling with high blood pressure, particularly those affected by obesity or aging.
              </p>
            </div>

       <div className="mb-8">
              <ImageWithFallback
                src="https://experthealthadvice.com/detox-tea/landers/84af3a0742/bvbp-AU-teafox-919.51-ob/files/lb_nolb-2.jpeg"
                alt="Green tea and herbs"
                className="w-full h-auto rounded"
              />
            </div>


     <div className="mb-8">
              <ImageWithFallback
                src="https://experthealthadvice.com/detox-tea/landers/84af3a0742/bvbp-AU-teafox-919.51-ob/files/star2.jpg"
                alt="Green tea and herbs"
                className="w-full h-auto rounded"
              />
            </div>
            
            <div className="bg-white border-2 border-green-500 rounded-lg p-6 mb-10">
              <p className="mb-4">
"I tried everything - strict diets, supplements, even expensive health programs - but nothing worked long-term.
              </p>
            
              <p>
After just one week of drinking <B>Lulutox</B> tea every morning, I noticed my blood pressure readings had stabilized and my mind felt clearer. I could focus again and even remember small details that used to slip away.
              </p>
              
              <p>
The most surprising part? I didn't change my lifestyle at all - just one cup of tea a day. I honestly feel better than I have in years."
                            </p>
                            
                            <p>
<b>- Maria K.</b>   , 72, Sydney                                                     </p>
            </div>

            {/* Why This Works */}
            <h2 className="text-3xl font-bold mb-6 mt-12">Why This Works When Conventional Methods Fail to Clear Blood Vessels</h2>
            <div className="prose max-w-none mb-8">
              <p className="mb-4">
                Traditional methods - strict dieting, cutting calories, or following complicated routines - focus solely on restriction. These approaches overlook the real culprit: toxic buildup, cholesterol deposits, and plaque inside your blood vessels that block circulation and raise blood pressure.
              </p>
              <p className="mb-4">
                Lulutox works differently. Rather than forcing your body to adjust, it works *with* your body's natural processes to support lasting health:
              </p>
              
              <div className="bg-blue-50 p-6 rounded-lg space-y-3 mb-6">
                <div>
                  <span className="font-bold text-blue-600">Step 1:</span> Gently flush out toxins, cholesterol, and plaque that clog blood vessels, improving overall flow
                </div>
                <div>
                  <span className="font-bold text-blue-600">Step 2:</span> Support smooth blood flow and efficient nutrient delivery to the heart and organs
                </div>
                <div>
                  <span className="font-bold text-blue-600">Step 3:</span> Activate the body's natural mechanisms to dissolve small blood clots and reduce internal pressure
                </div>
                <div>
                  <span className="font-bold text-blue-600">Step 4:</span> Sustain consistent energy levels throughout the day, without crashes, dizziness, or fatigue
                </div>
              </div>

              <p className="text-lg font-semibold">
                The result? Gradual clearing of blood vessels, naturally stabilized blood pressure, and increased energy - all without discomfort, strict rules, or extreme restrictions.
              </p>
            </div>

            {/* The Simple Morning Ritual */}
            <h2 className="text-3xl font-bold mb-6 mt-12">The Simple Morning Ritual</h2>
            <div className="prose max-w-none mb-8">
              <p className="mb-4">
                Using Lulutox couldn't be simpler. Brew one cup each morning - it has a pleasant peach flavor that most people enjoy - and drink it before or with breakfast. No measuring, no mixing, no complicated preparations.
              </p>

              <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-6 mb-4">
                <h4 className="font-bold mb-3">Within the first week, most people notice:</h4>
                <ul className="space-y-2">
                  <li>✓ Clearer blood vessels and smoother blood flow</li>
                  <li>✓ More stable energy throughout the day</li>
                  <li>✓ Improved circulation and overall cardiovascular comfort</li>
                  <li>✓ Lower blood pressure and reduced inflammation</li>
                </ul>
              </div>

              <p className="text-lg">
                By week 4, the real transformation begins: Blood vessels continue to clear, circulation improves, and your overall cardiovascular health is revitalized. This simple ritual supports your heart and brain, allowing your body to operate as it was designed to.
              </p>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              {/* Special Offer Box - appears at 35% scroll */}
              {scrollProgress >= 35 && (
                <div className="bg-gradient-to-br from-pink-50 to-purple-50 border-2 border-pink-300 rounded-lg p-4 animate-in fade-in slide-in-from-top-4 duration-500">
                  <h4 className="text-center font-bold mb-3">Special Offer</h4>
                  <div className="mb-4">
                    <img 
                      src={productImage}
                      alt="Lulutox Product"
                      className="w-full h-auto rounded"
                    />
                  </div>
                  <p className="text-center text-sm mb-3">Expires on Saturday, February 21, 2026</p>
                  <div className="flex justify-center">
                    <a href="https://my.experthealthadvice.com/click" target="_blank" rel="noopener noreferrer" className="block">
                      <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-3 text-lg shadow-lg">
                        BUY NOW
                      </Button>
                    </a>
                  </div>
                </div>
              )}


              
              {/* Reader Results Sidebar */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-sm font-bold text-gray-500 uppercase mb-4 pb-2 border-b">Reader Results</h3>
                
                <div className="space-y-6 mb-6">
                  <div className="text-sm">
                    <p className="mb-2 italic">"I've been struggling with high blood pressure for years. Lulutox helped lower my blood pressure in just a month. Thank you so much!"</p>
                    <p className="font-semibold">Jessica S.</p>
                    <p className="text-gray-600">Sydney, Australia</p>
                  </div>

                  <div className="text-sm border-t pt-4">
                    <p className="mb-2 italic">"For the first time in forever, I finally feel healthy and energized every morning. I haven't felt this confident in my health in decades!"</p>
                    <p className="font-semibold">Tiffany C.</p>
                    <p className="text-gray-600">Melbourne, Australia</p>
                  </div>

                  <div className="text-sm border-t pt-4">
                    <p className="mb-2 italic">"Thank God I didn't go through with that barre membership... I got the same results, for less than a cup of coffee!"</p>
                    <p className="font-semibold">Christina Novotney</p>
                    <p className="text-gray-600">Brisbane, Australia</p>
                  </div>
                </div>

                <div className="text-sm border-t pt-4">
                  <p className="mb-2 italic">"I've only been using Lulutox for two weeks, and I already love it! My blood pressure has returned to normal, and years of headaches have noticeably improved."</p>
                  <p className="font-semibold">Carol Keeton</p>
                  <p className="text-gray-600">Perth, Australia</p>
                </div>

                <div className="text-sm border-t pt-4">
                  <p className="mb-2 italic">"I've been using Lulutox, and I'm extremely impressed with the results! My blood pressure is back to normal, my energy levels have improved."</p>
                  <p className="font-semibold">Briana Smith</p>
                  <p className="text-gray-600">Adelaide, Australia</p>
                </div>

                <div className="text-sm border-t pt-4">
                  <p className="mb-2 italic">"YES!! Finally, I have found a product that truly supports cardiovascular health. At 48 years old, this is the first time I've experienced such noticeable improvements."</p>
                  <p className="font-semibold">Angie Clayton</p>
                  <p className="text-gray-600">Gold Coast, Australia</p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Guarantee Section */}
        <div className="max-w-4xl mx-auto mt-12 bg-green-50 border-2 border-green-500 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Update: Zero Risk With 30-Day Guarantee</h2>
          <p className="text-lg mb-6">
            Try Lulutox for 30 days. If you don't see significant results - simply return the unused portion for a full refund. No questions asked.
          </p>
          <div className="mb-6 flex flex-col md:flex-row items-center justify-center gap-6">
            <img 
              src={productImage}
              alt="Lulutox Product"
              className="w-full max-w-xs h-auto rounded-lg shadow-lg"
            />
            <img 
              src={guaranteeBadge}
              alt="100% Customer Satisfaction Guaranteed"
              className="w-32 h-auto"
            />
          </div>
        <a href="https://my.experthealthadvice.com/click" target="_blank" rel="noopener noreferrer" className="block">  <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-4 px-12 text-xl shadow-xl">
            BUY NOW
          </Button></a>
          <p className="mt-4 text-red-600 font-semibold">This special offer ends: Saturday, February 21, 2026</p>
        </div>

        {/* Comments Section */}
        <div className="max-w-4xl mx-auto mt-12 bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-6">Recent # Comments</h2>
          <div className="space-y-6">
            {displayedComments.map((comment, index) => (
              <div key={index} className="border-b pb-6 last:border-b-0">
                <div className="flex items-start gap-4">
                  {/* Avatar with Image */}
                  <img 
                    src={comment.avatar} 
                    alt={comment.name}
                    className="w-12 h-12 rounded-full flex-shrink-0 object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-1">{comment.name}</h4>
                    <p className="text-gray-700 mb-3">{comment.text}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <button 
                        onClick={() => handleReply(index)}
                        className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
                      >
                        Reply
                      </button>
                      <button 
                        onClick={() => toggleLike(index)}
                        className={`flex items-center gap-1 font-medium transition-colors ${
                          likedComments.has(index) ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                        }`}
                      >
                        <span>{likedComments.has(index) ? comment.likes + 1 : comment.likes}</span>
                        <span>{likedComments.has(index) ? 'Liked' : 'Like'}</span>
                      </button>
                      <span className="text-gray-500">{comment.time}</span>
                    </div>
                  </div>
                </div>
                {/* Reply Form */}
                {replyingTo === index && (
                  <div className="mt-4 ml-16 bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      placeholder={`Reply to ${comment.name}...`}
                      rows={3}
                    />
                    <div className="flex gap-2 mt-3">
                      <Button
                        onClick={() => submitReply(index)}
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        Post Reply
                      </Button>
                      <Button
                        onClick={() => setReplyingTo(null)}
                        size="sm"
                        variant="outline"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {!showAllComments && comments.length > 8 && (
            <div className="mt-6 text-center">
              <Button
                onClick={() => setShowAllComments(true)}
                variant="outline"
                className="flex items-center gap-2 mx-auto"
              >
                Show More Comments
                <ChevronDown size={16} />
              </Button>
            </div>
          )}

          {showAllComments && (
            <div className="mt-6 text-center">
              <Button
                onClick={() => setShowAllComments(false)}
                variant="outline"
                className="flex items-center gap-2 mx-auto"
              >
                Show Less
                <ChevronUp size={16} />
              </Button>
            </div>
          )}
        </div>

        {/* Final CTA */}
        <div className="max-w-4xl mx-auto mt-12 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg p-12 text-center shadow-2xl">
          <h2 className="text-4xl font-bold mb-4">Don't Wait - Limited Time Offer!</h2>
          <p className="text-xl mb-8">Join thousands of Australians who have already improved their cardiovascular health with Lulutox</p>
          <a href="https://my.experthealthadvice.com/click" target="_blank" rel="noopener noreferrer">
            <Button className="bg-white text-red-600 hover:bg-gray-100 font-bold py-4 px-16 text-xl shadow-xl">
              CLAIM YOUR DISCOUNT NOW
            </Button>
          </a>
          <p className="mt-6 text-lg">✓ 30-Day Money-Back Guarantee</p>
          <p className="text-lg">✓ Free Shipping Australia-Wide</p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 mt-16 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center text-sm">
          <p className="mb-2">Terms of Service | Privacy Policy | Contact Us</p>
          <p className="text-gray-500">
            Disclaimer: Results may vary from person to person. Consult with a healthcare professional before starting any new dietary supplement.
            This product is not intended to diagnose, treat, cure or prevent any disease.
          </p>
          <p className="text-gray-500 mt-4">© 2026 Health News. All rights reserved.</p>
        </div>
      </footer>

      {/* Sticky Bottom CTA - appears at 50% scroll */}
      {scrollProgress >= 50 && (
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-2xl z-50 animate-slide-up">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-center">
                <h3 className="font-bold text-base sm:text-lg">Special Offer - 70% OFF!</h3>
                <p className="text-xs sm:text-sm">Limited time offer expires today</p>
              </div>
              <a href="https://my.experthealthadvice.com/click" target="_blank" rel="noopener noreferrer">
                <Button className="bg-white text-red-600 hover:bg-gray-100 font-bold py-2 px-6 sm:py-3 sm:px-8 text-base sm:text-lg shadow-xl whitespace-nowrap">
                  CLAIM DISCOUNT NOW
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  );
}