import { useState, useEffect, useRef } from "react";
import { gameConfig } from "@/gameConfig";
import { motion } from "framer-motion";

interface CCUCounterProps {
	className?: string;
}

interface RollingDigitProps {
  value: number;
}

export function RollingDigit({ value }: RollingDigitProps) {
  return (
    <div className="relative overflow-hidden h-[1em] w-[0.6em] inline-block align-baseline">
      <motion.div
        key={value} // forces motion to animate between old and new digit
        initial={{ y: 0 }}
        animate={{ y: `-${value}em` }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
        className="flex flex-col " // removed text-gradient-fire bg-clip-text text-transparent
      >
        {Array.from({ length: 10 }, (_, i) => (
          <span
            key={i}
            className="h-[1em] leading-[1em] flex items-center justify-center"
          >
            {i}
          </span>
        ))}
      </motion.div>
    </div>
  );
}


export function CCUCounter({ className = "" }: CCUCounterProps) {
	const [ccu, setCcu] = useState<number>(0);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const previousCcuRef = useRef<number>(0);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	const formatNumber = (num: number): string => {
		return num.toLocaleString();
	};

	const fetchCCU = async () => {
		try {
			setError(null);

			// fetch all games from config
			const responses = await Promise.all(
				gameConfig.map((game) =>
					fetch(
						`https://games.roproxy.com/v1/games?universeIds=${game.universeId}`
					)
				)
			);

			if (responses.some((res) => !res.ok)) {
				throw new Error("Failed to fetch CCU data");
			}

			const dataList = await Promise.all(responses.map((res) => res.json()));
			const totalCcu = dataList.reduce(
				(sum, data) => sum + (data.data?.[0]?.playing || 0),
				0
			);

			// Smooth number transition
			const previousCcu = previousCcuRef.current;
			const difference = totalCcu - previousCcu;
			const steps = 20;
			const stepDuration = 50;

			if (difference !== 0) {
				let currentStep = 0;
				const stepInterval = setInterval(() => {
					currentStep++;
					const progress = currentStep / steps;
					const easeProgress = 1 - Math.pow(1 - progress, 3);
					const currentValue = Math.round(
						previousCcu + difference * easeProgress
					);

					setCcu(currentValue);

					if (currentStep >= steps) {
						clearInterval(stepInterval);
						setCcu(totalCcu);
						previousCcuRef.current = totalCcu;
					}
				}, stepDuration);
			} else {
				setCcu(totalCcu);
				previousCcuRef.current = totalCcu;
			}

			setIsLoading(false);
		} catch (err) {
			console.error("Error fetching CCU:", err);
			setError("Failed to fetch player count");
			setIsLoading(false);
		}
	};

	useEffect(() => {
		// Initial fetch
		fetchCCU();

		// Set up interval to fetch every 15 seconds
		intervalRef.current = setInterval(fetchCCU, 15000);

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, []);

	const renderAnimatedDigits = (number: number) => {
	  const formattedNumber = formatNumber(number);
	  return formattedNumber.split("").map((char, index) => {
	    if (isNaN(Number(char))) {
	      // keep commas as static spans
	      return (
	        <span key={`${char}-${index}`} className="px-1">
	          {char}
	        </span>
	      );
	    }
	    return <RollingDigit key={`${char}-${index}`} value={Number(char)} />;
	  });
	};


	if (error) {
		return (
			<div className={`text-center ${className}`}>
				<div className="text-destructive text-lg mb-2">⚠️ Connection Error</div>
				<div className="text-muted-foreground">{error}</div>
			</div>
		);
	}

	return (
		<div className={`text-center ${className}`}>
			<div className="mb-4">
				<h2 className="text-2xl font-semibold text-muted-foreground mb-2">
					Total Active Players
				</h2>
				<div className="relative">
					<div className="text-8xl md:text-9xl font-bold leading-none -mt-5"> {/*removed glow-primary*/}
						{isLoading ? (
							<span className="text-gradient animate-pulse">Loading...</span>
						) : (
							renderAnimatedDigits(ccu)
						)}
					</div>
					{/*<div className="absolute inset-0 bg-gradient-neon opacity-20 blur-xl animate-pulse-glow rounded-lg"></div>*/}
				</div>
				<div className="text-lg text-muted-foreground mt-2">
					Concurrent Users Across All Games
				</div>
			</div>
		</div>
	);
}
