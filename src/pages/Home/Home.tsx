import type {Component} from 'solid-js';
import '../../style/glass.css';
import Typography from '../../components/Typography/Typography.tsx';
import styles from './Home.module.css';
import Logo from '../../components/Logo/Logo.tsx';

const Home: Component = () => {
    return (
        <>
            <div class={`glass higher-blur ${styles.content}`}>
                <Logo />
                <Typography variant="h3">
                    简介
                </Typography>
                <Typography variant="p">
                    这里是失落小站（的镜像站）, 一个galgame资源站（的镜像站）。
                </Typography>
                <Typography variant="p">
                    这里收录了大部分的汉化（也可只运行日文原版，已经破解）galgame，全部压缩包都没有解压密码。
                </Typography>
                <Typography variant="p">
                    有在 Windows 电脑上面运行的，krkr 和 ons 是手机版，需要进入模拟器页面下载专属的模拟器解压再运行。
                </Typography>
                <Typography variant="h3">
                    有关反馈
                </Typography>
                <Typography variant="p">
                    镜像站架设在美国，遵守美国法律。源站架设在香港，遵守香港本地法律。
                </Typography>
                <Typography variant="p">
                    如有问题，请在 <a href="https://t.me/upsetgal" target="_blank">Telegram 群组</a> 联系站长或镜像站管理员。
                </Typography>
                <Typography variant="p">
                    由于最近境内处于严打状态, 为了保持存活, 源站站长已关闭一切境内通讯软件(例如qq)的入口，请谅解。
                </Typography>
                <Typography variant="p">
                    源站甚至镜像站进不去？使用垃圾VPN半天加载不出来？或者遇到了进不去Telegram？<br/>
                    说明你被当地运营商掐网线了，推荐使用 <a href="https://congyu.moe/auth/register?code=e30dc2bc97" target="_blank">丛雨VPN / 丛雨云</a> <br/>
                    柚子厨专属vpn，既有专线高速流量，延迟25ms内；<br/>
                    又有低倍率流量让你用到爽, 性价比之神,  <br/>
                    循环 10% off 优惠码: shinnku
                </Typography>
                <Typography variant="h3">
                    法律与版权
                </Typography>
                <Typography variant="p">
                    本资源仅供学习交流使用，请务必于下载后 24 小时内删除，如有能力请购买正版支持。
                </Typography>
                <Typography variant="p">
                    本站不承担任何为此带来的后果。
                </Typography>
                <Typography variant="p">
                    本公告长期有效。
                </Typography>
                <div class={styles.gossip}>
                    <h4>
                        镜像站站长的碎碎念
                    </h4>
                    <p>
                        怎么突然这么多人，甚至搜索结果第二名，吓我一跳。
                    </p>
                    <p>
                        上面那个广告是源站同步过来的，别问我丛雨云的事，我也不知道。
                    </p>
                    <p>
                        似乎是源站被墙，镜像站无事，所以大家都来镜像站了。
                    </p>
                    <p>
                        GFW我草泥马，别把我也给墙了。
                    </p>
                </div>

            </div>
        </>
    );
};

export default Home;