import * as React from 'react';
import { Button } from './Button';

interface QuestionBoxProps {
	flag: string;
	country: string;
	capital: string;
}

export const QuestionBox: React.FC<QuestionBoxProps> = (props) => {
	return (
		<div style={{
			position: 'absolute',
			zIndex: 1000,
			bottom: "50px",
			left: "50%",
			transform: "translateX(-50%)",

			width: "90%",
			background: "rgba(255, 255, 255, 0.5)",
			backdropFilter: "blur(10px)",
			borderRadius: "0.5rem",

			display: "flex",
			justifyContent: "space-evenly",
			alignItems: "center",
			paddingBlock: "2rem",
			paddingInline: "2rem",
			outline: "1px solid #a1a1aa",
		}}>
			<div style={{
				width: "100%",
				display: "flex",
				justifyContent: "space-evenly",
			}}>
				<img src={props.flag} alt="flag" style={{width: "15%", height: "auto"}} />
				<div>
					<h3>{props.country}</h3>
					<p>{props.capital}</p>
				</div>
			</div>

			<div style={{
				display: "grid",
				justifyItems: "center",
				gap: "1rem",
				width: "100%",
				height: "100%",
			}}>
				<div style={{
					display: "flex",
					width: "75%",
					justifyContent: "space-evenly",
					alignItems: "center",
				}}>
					<Button>Skip</Button>
					<Button>Pause</Button>
				</div>
			</div>
		</div>
	)
}
